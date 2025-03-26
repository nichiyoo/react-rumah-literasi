import * as React from 'react';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';
import { useNavigate } from 'react-router';

import axios from '@/libs/axios';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import BookForm from '@/components/books/form-book';

const CreateBook = () => {
	const navigate = useNavigate();
	const { mutate } = useSWRConfig();

	const onSubmit = async (data) => {
		try {
			await axios.post('/books', data, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			toast('Book created', {
				description: 'Successfully created book',
			});

			mutate('/books');
			navigate('/dashboard/books');
		} catch (error) {
			toast.error('Failed to create book', {
				description: error.response.data.message || error.message,
			});
			console.error(error);
		}
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Create Book</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<BookForm action={onSubmit} label='Create Book' />
		</div>
	);
};

export default CreateBook;
