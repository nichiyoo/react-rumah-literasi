import * as React from 'react';

import useSWR from 'swr';
import { toast } from 'sonner';
import { Link } from 'react-router';
import { usePagination } from '@/hooks/use-pagination';

import axios from '@/libs/axios';
import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-confirm';

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
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Loading } from '@/components/loading';
import { Empty } from '@/components/empty';
import { Error } from '@/components/error';
import { currency } from '@/libs/utils';
import { PAYMENT_STATUS } from '@/libs/constant';
import { useResultState } from '@/hooks/use-result-state';
import { Pagination } from '@/components/pagination';

const ListDonations = () => {
	const { confirm } = useConfirm();
	const { page, limit } = usePagination();

	const {
		error,
		mutate,
		data,
		isLoading: loading,
	} = useSWR([
		'financial-donations',
		{
			params: {
				page: page,
				limit: limit,
			},
		},
	]);

	const { result, pagination, empty } = useResultState(error, loading, data);

	const handleDelete = async (id) => {
		confirm({
			title: 'Confirm Action',
			variant: 'destructive',
			description: 'Are you sure you want to delete this record?',
		})
			.then(async () => {
				try {
					await axios.delete('/financial-donations/' + id);
					mutate();
					toast('Financial donation deleted', {
						description: 'Successfully deleted donation',
					});
				} catch (error) {
					toast.error('Failed to delete donation', {
						description: error.response?.data?.message || error.message,
					});
					console.error(error);
				}
			})
			.catch(() => {
				// pass
			});
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Financial Donations List</HeadingTitle>
				<HeadingDescription>
					Manage all financial donations with pagination functionality.
				</HeadingDescription>

				<div className='flex items-center justify-end'>
					<Link to='/dashboard/financial-donations/create'>
						<Button>Create Financial Donation</Button>
					</Link>
				</div>
			</Heading>

			<div className='w-full overflow-x-auto border rounded-xl border-zinc-200'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Member</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Notes</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{result.map((financialDonation) => (
							<TableRow key={financialDonation.id}>
								<TableCell>
									<div className='flex items-center gap-4'>
										<Avatar
											name={financialDonation.user?.name}
											className='flex-none'
										/>
										<span className='font-medium'>
											{financialDonation.user?.name}
										</span>
									</div>
								</TableCell>
								<TableCell>{currency(financialDonation.amount)}</TableCell>
								<TableCell>
									<Badge>{financialDonation.status}</Badge>
								</TableCell>
								<TableCell>{financialDonation.notes}</TableCell>
								<TableCell>
									<div className='flex items-center gap-2'>
										{financialDonation.status === PAYMENT_STATUS.PENDING && (
											<a
												href={financialDonation.payment_url}
												target='_blank'
												rel='noreferrer'>
												<button className='bg-transparent hover:text-blue-500'>
													Complete Payment
												</button>
											</a>
										)}
										<Link to={financialDonation.id.toString()} relative='path'>
											<button className='bg-transparent hover:text-amber-500'>
												Detail
											</button>
										</Link>
										<button
											onClick={() => handleDelete(financialDonation.id)}
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

			{pagination && <Pagination pagination={pagination} />}
		</div>
	);
};

export default ListDonations;
