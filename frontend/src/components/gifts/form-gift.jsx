import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const GiftSchema = z.object({
	title: z.string().min(3),
	genre: z.string().min(3),
	amount: z.coerce.number().min(1),
	address: z.string().min(3),
});

const EditSchema = GiftSchema.merge(
	z.object({
		status: z.enum(['pending', 'success', 'failed']),
	})
);

const GiftForm = ({ initial, action, label }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(initial ? EditSchema : GiftSchema),
		defaultValues: initial || {
			title: '',
			genre: '',
			amount: 1,
			address: '',
		},
	});

	return (
		<form onSubmit={handleSubmit(action)} className='grid grid-cols-2 gap-6'>
			<div className='col-span-full'>
				<Label htmlFor='title'>Title</Label>
				<Input
					type='text'
					placeholder='Enter the title of the book'
					{...register('title')}
				/>
				{errors.title && (
					<span className='text-red-500'>{errors.title.message}</span>
				)}
			</div>

			<div>
				<Label htmlFor='genre'>Genre</Label>
				<Input
					type='text'
					placeholder='Enter the genre of the book'
					{...register('genre')}
				/>
				{errors.genre && (
					<span className='text-red-500'>{errors.genre.message}</span>
				)}
			</div>

			<div>
				<Label htmlFor='amount'>Amount</Label>
				<Input
					type='number'
					placeholder='Enter the amount of books'
					{...register('amount')}
				/>
				{errors.amount && (
					<span className='text-red-500'>{errors.amount.message}</span>
				)}
			</div>

			<div className='col-span-full'>
				<Label htmlFor='address'>Address</Label>
				<Textarea placeholder='Enter your address' {...register('address')} />
				{errors.address && (
					<span className='text-red-500'>{errors.address.message}</span>
				)}
			</div>

			{initial && (
				<div>
					<Label htmlFor='status'>Status</Label>

					<select
						className='block w-full p-3 border shadow-sm border-zinc-300 rounded-xl focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-zinc-100'
						{...register('status')}>
						<option value='pending'>Pending</option>
						<option value='success'>Success</option>
						<option value='failed'>Failed</option>
					</select>

					{errors.status && (
						<span className='text-red-500'>{errors.status.message}</span>
					)}
				</div>
			)}

			<div className='col-span-full'>
				<Button>{label}</Button>
			</div>
		</form>
	);
};

export default GiftForm;
