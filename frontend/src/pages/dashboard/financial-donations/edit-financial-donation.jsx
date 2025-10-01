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

import DonationForm from '@/components/financial-donations/form-financial-donation';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';

const EditDonation = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		error,
		mutate,
		data: result,
		isLoading: loading,
	} = useSWR('/financial-donations/' + id);

	const onSubmit = async (data) => {
		try {
			await axios.put('/financial-donations/' + result.data.id, data);

			toast('Financial donation updated', {
				description: 'Successfully updated donation',
			});

			mutate();
			navigate('/dashboard/financial-donations');
		} catch (error) {
			toast.error('Failed to update donation', {
				description: error.response.data.message || error.message,
			});
			console.error(error);
		}
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Edit Financial Donations</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<Error error={!loading && error} />
			<Loading loading={loading} />

			{result && (
				<DonationForm
					initial={result.data}
					action={onSubmit}
					label='Update Donation'
				/>
			)}
		</div>
	);
};

export default EditDonation;
