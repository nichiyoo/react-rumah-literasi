import * as React from 'react';

import useSWR from 'swr';
import { toast } from 'sonner';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-confirm';
import axios, { fetcher, isAxiosError } from '@/libs/axios';

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

const ListDonations = () => {
	const { confirm } = useConfirm();

	const {
		error,
		mutate,
		data: result = { data: [] },
		isLoading: loading,
	} = useSWR('/donations', fetcher);

	const empty = result && result.data.length == 0;

	const handleDelete = async (id) => {
		confirm({
			title: 'Confirm Order',
			variant: 'desctructive',
			description: 'Are you sure you want to delete this record?',
		})
			.then(async () => {
				try {
					await axios.delete('/donations/' + id);
					mutate();
					toast('Donation deleted', {
						description: 'Successfully deleted donation',
					});
				} catch (error) {
					toast.error('Failed to delete donation', {
						description: isAxiosError(error)
							? error.response.data.message
							: error.message,
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
				<HeadingTitle>Donations List</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>

				<div className='flex items-center justify-end'>
					<Link to='/dashboard/donations/create'>
						<Button>Create Donation</Button>
					</Link>
				</div>
			</Heading>

			<div className='w-full overflow-x-auto border rounded-lg border-zinc-200'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Account</TableHead>
							<TableHead>Receipt</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading && (
							<TableRow>
								<TableCell colSpan={3} className='py-10 text-center'>
									<span className='text-zinc-500'>Loading data...</span>
								</TableCell>
							</TableRow>
						)}

						{empty && (
							<TableRow>
								<TableCell colSpan={3} className='py-10 text-center'>
									<span className='text-zinc-500'>No data found</span>
								</TableCell>
							</TableRow>
						)}

						{error ? (
							<TableRow>
								<TableCell colSpan={3} className='py-10 text-center'>
									<span className='text-zinc-500'>Failed to load data</span>
								</TableCell>
							</TableRow>
						) : (
							result.data.map((donation) => (
								<TableRow key={donation.id}>
									<TableCell>{donation.account}</TableCell>
									<TableCell>{donation.receipt}</TableCell>
									<TableCell>
										<div className='flex items-center gap-2'>
											<button className='bg-transparent hover:text-amber-500'>
												Edit
											</button>
											<button
												onClick={() => handleDelete(donation.id)}
												className='bg-transparent hover:text-red-500'>
												Delete
											</button>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default ListDonations;
