import useSWR from 'swr';
import { toast } from 'sonner';
import { Link } from 'react-router';

import axios from '@/libs/axios';
import { useConfirm } from '@/hooks/use-confirm';
import { useResultState } from '@/hooks/use-result-state';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Loading } from '@/components/loading';
import { Empty } from '@/components/empty';
import { Error } from '@/components/error';
import { Badge } from '@/components/ui/badge';

const ListAddresses = () => {
	const { confirm } = useConfirm();
	const { error, mutate, data, isLoading: loading } = useSWR('/addresses');
	const { result, empty } = useResultState(error, loading, data);

	const handleDelete = async (id) => {
		confirm({
			title: 'Confirm Action',
			variant: 'destructive',
			description: 'Are you sure you want to delete this address?',
		})
			.then(async () => {
				try {
					await axios.delete('/addresses/' + id);
					mutate();
					toast('Address deleted', {
						description: 'Successfully deleted address',
					});
				} catch (error) {
					toast.error('Failed to delete address', {
						description: error.response.data.message || error.message,
					});
					console.log(error);
				}
			})
			.catch(() => {
				// pass
			});
	};

	const handleDefault = async (id) => {
		confirm({
			title: 'Confirm Action',
			description: 'Are you sure you want to set this address as default?',
		})
			.then(async () => {
				try {
					await axios.patch('/addresses/' + id + '/default');
					mutate();
					toast('Address set as default', {
						description: 'Successfully set address as default',
					});
				} catch (error) {
					toast.error('Failed to set address as default', {
						description: error.response.data.message || error.message,
					});
					console.log(error);
				}
			})
			.catch(() => {
				// pass
			});
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Addresses List</HeadingTitle>
				<HeadingDescription>
					Manage your saved addresses for book donations and other activities.
				</HeadingDescription>

				<div className='flex items-center justify-end'>
					<Link to='/dashboard/addresses/create'>
						<Button>Create Address</Button>
					</Link>
				</div>
			</Heading>

			<div className='w-full overflow-x-auto border rounded-lg border-zinc-200'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Address</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>City</TableHead>
							<TableHead>Province</TableHead>
							<TableHead>Zipcode</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{result.map((address) => (
							<TableRow key={address.id}>
								<TableCell className='flex items-center gap-2'>
									<p className='truncate'>{address.street_address}</p>
								</TableCell>
								<TableCell>
									{address.is_default ? (
										<Badge variant='primary'>default</Badge>
									) : (
										<button
											className='items-center flex-none px-3 py-1 text-xs font-medium capitalize border rounded-full whitespace-nowrap text-zinc-500'
											onClick={() => handleDefault(address.id)}>
											not default
										</button>
									)}
								</TableCell>
								<TableCell>{address.city.name}</TableCell>
								<TableCell>{address.province.name}</TableCell>
								<TableCell>{address.zipcode}</TableCell>
								<TableCell>
									<div className='flex items-center gap-2'>
										<Link to={address.id + '/detail'} relative='path'>
											<button className='bg-transparent hover:text-amber-500'>
												Detail
											</button>
										</Link>
										<button
											onClick={() => handleDelete(address.id)}
											className='bg-transparent hover:text-red-500'>
											Delete
										</button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				<Error error={!loading && error} />
				<Empty empty={!loading && empty} />
				<Loading loading={loading} />
			</div>
		</div>
	);
};

export default ListAddresses;
