import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { STEPS, useTransactionStore } from '@/store/use-transactions';
import { Textarea } from '@/components/ui/textarea';

const TransactionSchema = z.object({
	phone: z.string().min(3),
	address: z.string().min(3),
	zipcode: z.string().min(3),
	borrowed_date: z.coerce.date(),
});

const StepRecipient = () => {
	const { recipient, setRecipient, advance } = useTransactionStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(TransactionSchema),
		defaultValues: recipient,
	});

	const onSubmit = async (data) => {
		setRecipient(data);
		advance(STEPS.DELIVERY);
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
