import * as React from 'react';
import useSWR from 'swr';
import { toast } from 'sonner';
import { useParams, useNavigate } from 'react-router';

import axios, { fetcher, isAxiosError } from '@/libs/axios';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import UserForm from '@/components/users/form-user';

const EditUser = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		error,
		mutate,
		data: result,
		isLoading: loading,
	} = useSWR('/users/' + id, fetcher);

	const onSubmit = async (data) => {
		try {
			await axios.put('/users/' + result.data.uuid, data, {
				headers: { 'Content-Type': 'application/json' },
			});

			toast('User updated', {
				description: 'Successfully updated user',
			});

			mutate();
			navigate('/dashboard/users');
		} catch (error) {
			toast.error('Failed to update user', {
				description: isAxiosError(error)
					? error.response?.data?.message
					: error.message,
			});
			console.error(error);
		}
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Edit User</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			{loading && (
				<div className='w-full h-96 rounded-xl bg-zinc-100'>
					<span>Loading...</span>
				</div>
			)}

			{error && (
				<div className='w-full h-96 rounded-xl bg-zinc-100'>
					<span>Error: {error.message}</span>
				</div>
			)}

			{result && (
				<UserForm initial={result.data} action={onSubmit} label='Update User' />
			)}
		</div>
	);
};

export default EditUser;
