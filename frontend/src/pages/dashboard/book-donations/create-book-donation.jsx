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

import BookDonationForm from '@/components/book-donations/form-book-donation';

const CreateBookDonation = () => {
	const navigate = useNavigate();
	const { mutate } = useSWRConfig();

	const onSubmit = async (data) => {
		try {
			await axios.post('/book-donations', data, {
				headers: { 'Content-Type': 'application/json' },
			});

			toast('Book Donation created', {
				description: 'Successfully created book donation',
			});

			mutate('/book-donations');
			navigate('/dashboard/book-donations');
		} catch (error) {
			toast.error('Failed to create book donation', {
				description: error.response.data.message || error.message,
			});
			console.error(error);
		}
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Create Book Donation</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<BookDonationForm action={onSubmit} label='Create Book donation' />
		</div>
	);
};

export default CreateBookDonation;
