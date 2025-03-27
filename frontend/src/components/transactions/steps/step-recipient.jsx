import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { STEPS, useTransactionStore } from '@/store/use-transactions';

import { Map } from '@/components/map';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useConfirm } from '@/hooks/use-confirm';

const TransactionSchema = z.object({
	phone: z.string().min(11),
	address: z.string().min(3),
	zipcode: z.string().min(6).max(6),
	latitude: z.coerce.number(),
	longitude: z.coerce.number(),
	borrowed_date: z.coerce.date(),
});

const StepRecipient = () => {
	const { confirm } = useConfirm();
	const { recipient, setRecipient, advance } = useTransactionStore();

	const {
		watch,
		setValue,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(TransactionSchema),
		defaultValues: recipient,
	});

	const onSubmit = async (data) => {
		confirm({
			title: 'Make sure you the information is correct',
			description: `This data will be used to deliver the book, 
      make sure you have the right information`,
		})
			.then(async () => {
				setRecipient({
					...data,
					borrowed_date: new Date(data.borrowed_date)
						.toISOString()
						.split('T')[0],
				});
				advance(STEPS.DELIVERY);
			})
			.catch(() => {
				// pass
			});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-6'>
			<div className='col-span-full'>
				<Label htmlFor='address'>Address</Label>
				<Textarea placeholder='Enter your address' {...register('address')} />
				{errors.address && (
					<span className='text-red-500'>{errors.address.message}</span>
				)}
			</div>

			<div>
				<Label htmlFor='phone'>Phone</Label>
				<Input
					type='text'
					placeholder='Enter your phone'
					{...register('phone')}
				/>
				{errors.phone && (
					<span className='text-red-500'>{errors.phone.message}</span>
				)}
			</div>

			<div>
				<Label htmlFor='zipcode'>Zipcode</Label>
				<Input
					type='text'
					placeholder='Enter your zipcode'
					{...register('zipcode')}
				/>
				{errors.zipcode && (
					<span className='text-red-500'>{errors.zipcode.message}</span>
				)}
			</div>

			<div className='col-span-full'>
				<Label htmlFor='location'>Location</Label>
				<Map
					location={{
						latitude: watch('latitude'),
						longitude: watch('longitude'),
					}}
					className='aspect-banner'
					setLocation={(location) => {
						setValue('latitude', location.latitude);
						setValue('longitude', location.longitude);
					}}
				/>
			</div>

			<div>
				<Label htmlFor='borrowed_date'>Borrowed Date</Label>
				<Input
					type='date'
					placeholder='Enter your borrowed date'
					{...register('borrowed_date')}
				/>
				{errors.borrowed_date && (
					<span className='text-red-500'>{errors.borrowed_date.message}</span>
				)}
			</div>

			<div className='flex items-center justify-end gap-2 col-span-full'>
				<Button variant='outline' onClick={() => advance(STEPS.BOOKS)}>
					Back
				</Button>
				<Button>Next</Button>
			</div>
		</form>
	);
};

export default StepRecipient;
