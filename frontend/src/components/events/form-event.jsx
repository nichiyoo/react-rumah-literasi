import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const EventSchema = z.object({
	title: z.string().min(3),
	description: z.string().min(3),
	date: z.coerce.date(),
});

const EventForm = ({ initial, action, label }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(EventSchema),
		defaultValues: initial || {
			title: '',
			description: '',
			date: new Date().toISOString().split('T')[0],
		},
	});

	return (
		<form onSubmit={handleSubmit(action)} className='grid grid-cols-2 gap-6'>
			<div className='col-span-full'>
				<Label htmlFor='title'>Title</Label>
				<Input
					type='text'
					placeholder='Enter your title'
					{...register('title')}
				/>
				{errors.title && (
					<span className='text-red-500'>{errors.title.message}</span>
				)}
			</div>

			<div className='col-span-full'>
				<Label htmlFor='description'>Description</Label>
				<Textarea
					placeholder='Enter your description'
					{...register('description')}
				/>
				{errors.description && (
					<span className='text-red-500'>{errors.description.message}</span>
				)}
			</div>

			<div className='col-span-full'>
				<Label htmlFor='date'>Date</Label>
				<Input
					type='date'
					placeholder='Enter your date'
					{...register('date')}
				/>
				{errors.date && (
					<span className='text-red-500'>{errors.date.message}</span>
				)}
			</div>

			<div className='col-span-full'>
				<Button>{label}</Button>
			</div>
		</form>
	);
};

export default EventForm;
