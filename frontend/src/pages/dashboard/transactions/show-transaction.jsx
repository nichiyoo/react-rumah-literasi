import * as React from 'react';

import useSWR from 'swr';
import { toast } from 'sonner';
import { Link, useParams } from 'react-router';

import axios from '@/libs/axios';
import { currency } from '@/libs/utils';
import { useAuth } from '@/hooks/use-auth';
import { useConfirm } from '@/hooks/use-confirm';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import { Error } from '@/components/error';
import { Loading } from '@/components/loading';
import { Button } from '@/components/ui/button';
import { BookCard } from '@/components/books/book-card';
import CourierDetail from '@/components/transactions/courier-detail';
import RecipientDetail from '@/components/transactions/recipient-detail';
import { INITIAL_COURIER, INITIAL_RECIPIENT } from '@/store/use-transactions';

const ShowTransaction = () => {
	const { uuid } = useParams();
	const { confirm } = useConfirm();
	const { user, loading: userLoading } = useAuth();

	const {
		data,
		error,
		mutate,
		isLoading: loading,
	} = useSWR('/transactions/' + uuid);

	const { recipient, books, courier, status } = React.useMemo(() => {
		if (error || loading) {
			return {
				books: [],
				recipient: INITIAL_RECIPIENT,
				courier: INITIAL_COURIER,
				status: null,
			};
		}

		return {
			books: data.data.transaction_items.map((item) => ({
				...item.book,
				amount: item.amount,
			})),
			recipient: {
				name: data.data.name,
				phone: data.data.phone,
				address: data.data.address,
				note: data.data.note,
				borrowed_date: data.data.borrowed_date,
				deadline_date: data.data.deadline_date,
			},
			courier: {
				zipcode: data.data.zipcode,
				courier_type: data.data.courier_type,
				courier_company: data.data.courier_company,
				delivery_fee: data.data.delivery_fee
					? currency(data.data.delivery_fee)
					: 'Not available',
				delivery_eta: data.data.delivery_eta || 'Not available',
			},
			status: data.data.status,
		};
	}, [error, loading, data]);

	const admin = !userLoading && user.role === 'admin';

	const handleApproval = (status, variant = 'primary') => {
		confirm({
			title: 'Confirm Action',
			description: 'Change transaction status to ' + status + '?',
			variant,
		})
			.then(async () => {
				try {
					toast('Changing transaction status', {
						description: 'Changing transaction status...',
					});

					await axios.post('/transactions/' + uuid + '/status', {
						status,
					});

					toast('Transaction status changed', {
						description: 'Successfully changed transaction status',
					});

					mutate();
				} catch (error) {
					toast.error('Failed to  change transaction status', {
						description: error.response.data.message || error.message,
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
				<HeadingTitle>Detail Transaction</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			{!loading && (
				<div className='relative grid items-start gap-6 xl:grid-cols-3'>
					<div className='grid gap-6'>
						<RecipientDetail recipient={recipient} />
						<CourierDetail courier={courier} />

						<div className='flex items-center gap-2'>
							<Link to='/dashboard/transactions'>
								<Button variant='outline'>Back</Button>
							</Link>

							{admin && status === 'pending' && (
								<React.Fragment>
									<Button
										variant='destructive'
										onClick={() => handleApproval('rejected', 'destructive')}>
										Reject
									</Button>
									<Button
										variant='primary'
										onClick={() => handleApproval('approved')}>
										Approve
									</Button>
								</React.Fragment>
							)}

							{admin && status === 'approved' && (
								<Button onClick={() => handleApproval('completed')}>
									Complete
								</Button>
							)}
						</div>
					</div>

					<div className='grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-4 xl:col-span-2'>
						{books.map((book) => (
							<BookCard book={book} key={book.id} />
						))}
					</div>
				</div>
			)}

			<Error error={!loading && error} />
			<Loading loading={loading} />
		</div>
	);
};

export default ShowTransaction;
