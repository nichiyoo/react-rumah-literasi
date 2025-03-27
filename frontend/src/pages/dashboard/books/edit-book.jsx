import * as React from 'react';

import useSWR from 'swr';
import { toast } from 'sonner';
import { useParams, useNavigate } from 'react-router';

import axios from '@/libs/axios';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import BookForm from '@/components/books/form-book';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';

const EditBook = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		error,
		mutate,
		data: result,
		isLoading: loading,
	} = useSWR('/books/' + id);

	const onSubmit = async (data) => {
		try {
			await axios.put('/books/' + result.data.id, data, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			toast('Book updated', {
				description: 'Successfully updated book',
			});

			mutate();
			navigate('/dashboard/books');
		} catch (error) {
			toast.error('Failed to update book', {
				description: error.response.data.message || error.message,
			});
			console.error(error);
		}
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Edit Book</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<Loading loading={loading} />
			<Error error={error} loading={loading} />

			{result && (
				<BookForm initial={result.data} action={onSubmit} label='Update Book' />
			)}
		</div>
	);
};

export default EditBook;
