import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TransactionItem } from '@/components/book-donations/donation-item-card';
import { Map } from '@/components/map';
import { HeadingSubtitle } from '@/components/ui/heading';
import { currency } from '@/libs/utils';
import { PAYMENT_STATUS } from '@/libs/constant';

const StatusSchema = z.object({
	status: z.enum([
		PAYMENT_STATUS.PENDING,
		PAYMENT_STATUS.SUCCESS,
		PAYMENT_STATUS.FAILED,
	]),
});

const BookDonationForm = ({ initial, action, label }) => {
	const { register, handleSubmit } = useForm({
		resolver: zodResolver(StatusSchema),
		defaultValues: initial || {
			status: PAYMENT_STATUS.PENDING,
		},
	});

	return (
		<form onSubmit={handleSubmit(action)} className='space-y-8'>
			<HeadingSubtitle>Donation Items</HeadingSubtitle>

			<div className='grid items-start grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
				{initial.book_donation_items.map((item) => (
					<div key={item.id} className='relative group'>
						<TransactionItem item={item} />
					</div>
				))}
			</div>

			<HeadingSubtitle>Donation Details</HeadingSubtitle>

			<div className='grid gap-6 lg:grid-cols-2'>
				<div>
					<Label htmlFor='member'>Member</Label>
					<Input disabled type='text' defaultValue={initial.user.name} />
				</div>
				<div>
					<Label htmlFor='amount'>Amount (Rp)</Label>
					<Input disabled type='text' defaultValue={currency(initial.amount)} />
				</div>

				<div>
					<Label htmlFor='weight'>Total Weight (kg)</Label>
					<Input disabled type='text' defaultValue={initial.weight + ' kg'} />
				</div>

				<div>
					<Label htmlFor='length'>Length (cm)</Label>
					<Input disabled type='text' defaultValue={initial.length + ' cm'} />
				</div>

				<div>
					<Label htmlFor='width'>Width (cm)</Label>
					<Input disabled type='text' defaultValue={initial.width + ' cm'} />
				</div>

				<div>
					<Label htmlFor='height'>Height (cm)</Label>
					<Input disabled type='text' defaultValue={initial.height + ' cm'} />
				</div>

				<div className='col-span-full'>
					<Label htmlFor='delivery_address'>Delivery Address</Label>
					<Input disabled type='text' defaultValue={initial.address.name} />
				</div>

				<div className='col-span-full'>
					<Label htmlFor='street_address'>Street Address</Label>
					<Input
						disabled
						type='text'
						defaultValue={initial.address.street_address}
					/>
				</div>

				<div className='col-span-full'>
					<Label htmlFor='location'>Location</Label>
					<Map
						location={{
							latitude: initial.address.latitude,
							longitude: initial.address.longitude,
						}}
						className='w-full aspect-banner'
						readonly
					/>
				</div>
			</div>

			<div>
				<Label htmlFor='status'>Status</Label>
				<select
					className='block w-full p-3 border border-zinc-200 rounded-xl focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-zinc-100'
					{...register('status')}>
					<option value={PAYMENT_STATUS.PENDING}>
						{PAYMENT_STATUS.PENDING}
					</option>
					<option value={PAYMENT_STATUS.SUCCESS}>
						{PAYMENT_STATUS.SUCCESS}
					</option>
					<option value={PAYMENT_STATUS.FAILED}>{PAYMENT_STATUS.FAILED}</option>
				</select>
			</div>

			<div className='col-span-full'>
				<Button type='submit'>{label}</Button>
			</div>
		</form>
	);
};

export default BookDonationForm;
