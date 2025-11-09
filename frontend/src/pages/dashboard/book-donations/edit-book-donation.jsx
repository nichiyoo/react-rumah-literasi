import * as React from 'react';
import { toast } from 'sonner';
import useSWR, { useSWRConfig } from 'swr';
import { useParams, useNavigate } from 'react-router';

import axios from '@/libs/axios';
import { useAuth } from '@/hooks/use-auth';
import { ROLES } from '@/libs/constant';

import {
	Heading,
	HeadingDescription,
	HeadingSubtitle,
	HeadingTitle,
} from '@/components/ui/heading';
import { TransactionItem } from '@/components/book-donations/donation-item-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Map } from '@/components/map';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';
import BookDonationForm from '@/components/book-donations/form-book-donation';
import { currency } from '@/libs/utils';

const EditBookDonationMain = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	const { mutate } = useSWRConfig();

	const {
		error,
		data: result,
		isLoading: loading,
	} = useSWR('/book-donations/' + id);

	const allowed = [ROLES.LIBRARIAN, ROLES.SUPERADMIN].includes(user.role);

	const onSubmit = async (data) => {
		if (!allowed) {
			toast.error('Permission Denied', {
				description: 'You do not have permission to update this book donation',
			});
			return;
		}

		try {
			await axios.put('/book-donations/' + result.data.id, data);
			toast('Book donation updated', {
				description: 'Successfully updated book donation',
			});

			mutate('/book-donations');
			mutate('/book-donations/' + id);
			navigate('/dashboard/book-donations');
		} catch (error) {
			toast.error('Failed to update book donation', {
				description: error.response?.data?.message || error.message,
			});
			console.error(error);
		}
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Edit Book Donation</HeadingTitle>
				<HeadingDescription>
					Update the status of this book donation.
				</HeadingDescription>
			</Heading>

			<Error error={!loading && error} />
			<Loading loading={loading} />

			{result && (
				<React.Fragment>
					<HeadingSubtitle>Donation Items</HeadingSubtitle>

					<div className='grid items-start grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
						{result.data.book_donation_items.map((item) => (
							<div key={item.id} className='relative group'>
								<TransactionItem item={item} />
							</div>
						))}
					</div>

					<HeadingSubtitle>Donation Details</HeadingSubtitle>

					<div className='grid gap-6 lg:grid-cols-2'>
						<div>
							<Label htmlFor='member'>Member</Label>
							<Input
								disabled
								type='text'
								defaultValue={result.data.user.name}
							/>
						</div>
						<div>
							<Label htmlFor='amount'>Amount (Rp)</Label>
							<Input
								disabled
								type='text'
								defaultValue={currency(result.data.amount)}
							/>
						</div>

						<div>
							<Label htmlFor='weight'>Total Weight (kg)</Label>
							<Input
								disabled
								type='text'
								defaultValue={result.data.weight + ' kg'}
							/>
						</div>

						<div>
							<Label htmlFor='length'>Length (cm)</Label>
							<Input
								disabled
								type='text'
								defaultValue={result.data.length + ' cm'}
							/>
						</div>

						<div>
							<Label htmlFor='width'>Width (cm)</Label>
							<Input
								disabled
								type='text'
								defaultValue={result.data.width + ' cm'}
							/>
						</div>

						<div>
							<Label htmlFor='height'>Height (cm)</Label>
							<Input
								disabled
								type='text'
								defaultValue={result.data.height + ' cm'}
							/>
						</div>

						<div className='col-span-full'>
							<Label htmlFor='delivery_address'>Delivery Address</Label>
							<Input
								disabled
								type='text'
								defaultValue={result.data.address.name}
							/>
						</div>

						<div className='col-span-full'>
							<Label htmlFor='street_address'>Street Address</Label>
							<Input
								disabled
								type='text'
								defaultValue={result.data.address.street_address}
							/>
						</div>

						<div className='col-span-full'>
							<Label htmlFor='location'>Location</Label>
							<Map
								location={{
									latitude: result.data.address.latitude,
									longitude: result.data.address.longitude,
								}}
								className='w-full aspect-banner'
								readonly
							/>
						</div>
					</div>

					<HeadingSubtitle>Status Management</HeadingSubtitle>

					<BookDonationForm
						initial={result.data}
						action={onSubmit}
						label='Update Status'
					/>
				</React.Fragment>
			)}
		</div>
	);
};

export default EditBookDonationMain;
