import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const DonationSchema = z.object({
	amount: z.coerce.number().min(1),
	notes: z.string().min(3),
});

const DonationForm = ({ initial, action, label }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(DonationSchema),
		defaultValues: initial || {
			amount: 0,
			notes: '',
		},
	});

	return (
		<form onSubmit={handleSubmit(action)} className='grid grid-cols-2 gap-6'>
			<div className='col-span-full'>
				<Label htmlFor='amount'>Amount</Label>
				<Input
					type='number'
					placeholder='Enter the amount of donation'
					{...register('amount')}
				/>
				{errors.amount && (
					<span className='text-red-500'>{errors.amount.message}</span>
				)}
			</div>

			<div className='col-span-full'>
				<Label htmlFor='notes'>Notes</Label>
				<Textarea
					type='text'
					placeholder='Enter your notes'
					{...register('notes')}
				/>
				{errors.notes && (
					<span className='text-red-500'>{errors.notes.message}</span>
				)}
			</div>

			<div className='col-span-full'>
				<Button>{label}</Button>
			</div>
		</form>
	);
};

export default DonationForm;
