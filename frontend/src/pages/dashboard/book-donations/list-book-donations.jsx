import * as React from 'react';

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
import { Badge } from '@/components/ui/badge';
import { Empty } from '@/components/empty';
import { Error } from '@/components/error';
import { Avatar } from '@/components/ui/avatar';

const ListBookDonations = () => {
	const { confirm } = useConfirm();
	const { error, mutate, data, isLoading: loading } = useSWR('/book-donations');
	const { result, empty } = useResultState(error, loading, data);

	const handleDelete = async (id) => {
		confirm({
			title: 'Confirm Action',
			variant: 'destructive',
			description: 'Are you sure you want to delete this record?',
		})
			.then(async () => {
				try {
					await axios.delete('/book-donations/' + id);
					mutate();
					toast('Book Donation deleted', {
						description: 'Successfully deleted book donation',
					});
				} catch (error) {
					toast.error('Failed to delete book donation', {
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
				<HeadingTitle>Book Donations List</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>

				<div className='flex items-center justify-end'>
					<Link to='/dashboard/book-donations/create'>
						<Button>Create Book Donation</Button>
					</Link>
				</div>
			</Heading>

			<div className='w-full overflow-x-auto border rounded-lg border-zinc-200'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Member</TableHead>
							<TableHead>Title</TableHead>
							<TableHead>Genre</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Address</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{result.map((bookDonation) => (
							<TableRow key={bookDonation.id}>
								<TableCell>
									<div className='flex items-center gap-4'>
										<Avatar
											name={bookDonation.user.name}
											className='flex-none'
										/>
										<span className='font-medium'>
											{bookDonation.user.name}
										</span>
									</div>
								</TableCell>
								<TableCell>{bookDonation.title}</TableCell>
								<TableCell>{bookDonation.genre}</TableCell>
								<TableCell>{bookDonation.amount}</TableCell>
								<TableCell>{bookDonation.address}</TableCell>
								<TableCell>
									<Badge>{bookDonation.status}</Badge>
								</TableCell>
								<TableCell>
									<div className='flex items-center gap-2'>
										<Link to={bookDonation.id + '/detail'} relative='path'>
											<button className='bg-transparent hover:text-amber-500'>
												Detail
											</button>
										</Link>
										<button
											onClick={() => handleDelete(bookDonation.id)}
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

export default ListBookDonations;
