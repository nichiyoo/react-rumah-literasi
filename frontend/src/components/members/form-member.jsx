import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const MemberSchema = z.object({
	name: z.string().min(3),
	email: z.string().min(3),
	password: z.string().min(3),
	role: z.enum(['student', 'admin', 'librarian']),
});

const MemberForm = ({ initial, action, label }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(MemberSchema),
		defaultValues: initial || {
			name: '',
			email: '',
			password: '',
			role: 'student',
		},
	});

	return (
		<form onSubmit={handleSubmit(action)} className='grid grid-cols-2 gap-6'>
			<div className='col-span-full'>
				<Label htmlFor='name'>Name</Label>
				<Input
					type='text'
					placeholder='Enter your name'
					{...register('name')}
				/>
				{errors.name && (
					<span className='text-red-500'>{errors.name.message}</span>
				)}
			</div>

			<div className='col-span-full'>
				<Label htmlFor='email'>Email</Label>
				<Input
					type='email'
					placeholder='Enter your email'
					{...register('email')}
				/>
				{errors.email && (
					<span className='text-red-500'>{errors.email.message}</span>
				)}
			</div>

			<div>
				<Label htmlFor='password'>Password</Label>
				<Input
					type='password'
					placeholder='Enter your password'
					{...register('password')}
				/>
				{errors.password && (
					<span className='text-red-500'>{errors.password.message}</span>
				)}
			</div>

			<div>
				<Label htmlFor='role'>Role</Label>

				<select
					className='block w-full p-3 border shadow-sm border-zinc-300 rounded-xl focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-zinc-100'
					{...register('role')}>
					<option value='student'>Student</option>
					<option value='admin'>Admin</option>
					<option value='librarian'>Librarian</option>
				</select>

				{errors.role && (
					<span className='text-red-500'>{errors.role.message}</span>
				)}
			</div>

			<div className='col-span-full'>
				<Button>{label}</Button>
			</div>
		</form>
	);
};

export default MemberForm;
