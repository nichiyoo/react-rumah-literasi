import * as React from 'react';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';

import axios from '@/libs/axios';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import DonationForm from '@/components/donations/form-donation';
import { useNavigate } from 'react-router';

const CreateDonation = () => {
	const { mutate } = useSWRConfig();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			const { data: result } = await axios.post('/donations', data);
			toast('Donation created', {
				description: 'Successfully created donation',
			});
			mutate('/donations');
			window.open(result.data.payment_url, '_blank');
			navigate('/dashboard/donations');
		} catch (error) {
			toast.error('Failed to create donation', {
				description: error.response.data.message || error.message,
			});
			console.error(error);
		}
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Create Donation</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<DonationForm action={onSubmit} label='Create Donation' />
		</div>
	);
};

export default CreateDonation;
