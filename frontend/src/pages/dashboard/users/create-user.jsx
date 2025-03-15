import * as React from 'react';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';
import { useNavigate } from 'react-router';

import axios, { isAxiosError } from '@/libs/axios';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import UserForm from '@/components/users/form-user';

const CreateUser = () => {
	const navigate = useNavigate();
	const { mutate } = useSWRConfig();

	const onSubmit = async (data) => {
		try {
			await axios.post('/users', data, {
				headers: { 'Content-Type': 'application/json' },
			});

			toast('User created', {
				description: 'Successfully created user',
			});

			mutate('/users');
			navigate('/dashboard/users');
		} catch (error) {
			toast.error('Failed to create user', {
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
				<HeadingTitle>Create User</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<UserForm action={onSubmit} label='Create User' />
		</div>
	);
};

export default CreateUser;
