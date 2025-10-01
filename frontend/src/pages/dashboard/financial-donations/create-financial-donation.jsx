import * as React from 'react';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';

import axios from '@/libs/axios';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import DonationForm from '@/components/financial-donations/form-financial-donation';
import { useNavigate } from 'react-router';

const CreateDonation = () => {
	const { mutate } = useSWRConfig();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			const { data: result } = await axios.post('/financial-donations', data);
			toast('Financial donation created', {
				description: 'Successfully created donation',
			});
			mutate('/financial-donations');
			window.open(result.data.payment_url, '_blank');
			navigate('/dashboard/financial-donations');
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
				<HeadingTitle>Create Financial Donations</HeadingTitle>
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
