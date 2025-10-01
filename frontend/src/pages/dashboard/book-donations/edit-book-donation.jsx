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

import BookDonationForm from '@/components/book-donations/form-book-donation';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';

const EditBookDonation = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		error,
		mutate,
		data: result,
		isLoading: loading,
	} = useSWR('/book-donations/' + id);

	const onSubmit = async (data) => {
		try {
			await axios.put('/book-donations/' + result.data.id, data, {
				headers: { 'Content-Type': 'application/json' },
			});

			toast('Book donation updated', {
				description: 'Successfully updated book donation',
			});

			mutate();
			navigate('/dashboard/book-donations');
		} catch (error) {
			toast.error('Failed to update book donation', {
				description: error.response.data.message || error.message,
			});
			console.error(error);
		}
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Edit Book Donation</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<Error error={!loading && error} />
			<Loading loading={loading} />

			{result && (
				<BookDonationForm
					initial={result.data}
					action={onSubmit}
					label='Update BookDonation'
				/>
			)}
		</div>
	);
};

export default EditBookDonation;
