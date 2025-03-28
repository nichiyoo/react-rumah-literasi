import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const BookSchema = z.object({
	title: z.string().min(3),
	author: z.string().min(3),
	publisher: z.string().min(3),
	year: z.coerce.number(),
	language: z.string().min(3),
	amount: z.coerce.number().min(1),
	cover: z.any(),
});

const BookForm = ({ initial, action, label }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(BookSchema),
		defaultValues: initial || {
			title: '',
			author: '',
			publisher: '',
			year: 0,
			language: '',
			amount: 0,
			cover: undefined,
		},
	});

	return (
		<form onSubmit={handleSubmit(action)} className='grid gap-6 lg:grid-cols-2'>
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

			<div className='col-span-2'>
				<Label htmlFor='author'>Author</Label>
				<Input
					type='text'
					placeholder='Enter your author'
					{...register('author')}
				/>
				{errors.author && (
					<span className='text-red-500'>{errors.author.message}</span>
				)}
			</div>

			<div>
				<Label htmlFor='publisher'>Publisher</Label>
				<Input
					type='text'
					placeholder='Enter your publisher'
					{...register('publisher')}
				/>
				{errors.publisher && (
					<span className='text-red-500'>{errors.publisher.message}</span>
				)}
			</div>

			<div>
				<Label htmlFor='year'>Year</Label>
				<Input
					type='number'
					placeholder='Enter your year'
					{...register('year')}
				/>
				{errors.year && (
					<span className='text-red-500'>{errors.year.message}</span>
				)}
			</div>

			<div>
				<Label htmlFor='language'>Language</Label>
				<Input
					type='text'
					placeholder='Enter your language'
					{...register('language')}
				/>
				{errors.language && (
					<span className='text-red-500'>{errors.language.message}</span>
				)}
			</div>

			<div>
				<Label htmlFor='amount'>Amount</Label>
				<Input
					type='number'
					placeholder='Enter your amount'
					{...register('amount')}
				/>
				{errors.amount && (
					<span className='text-red-500'>{errors.amount.message}</span>
				)}
			</div>

			<div className='col-span-full'>
				<Label htmlFor='cover'>Cover</Label>
				<Input
					type='file'
					accept='image/*'
					placeholder='Enter your cover'
					className='file:hidden'
					{...register('cover')}
				/>
				{errors.cover && (
					<span className='text-red-500'>{errors.cover.message}</span>
				)}
			</div>

			<div className='col-span-full'>
				<Button>{label}</Button>
			</div>
		</form>
	);
};

export default BookForm;
