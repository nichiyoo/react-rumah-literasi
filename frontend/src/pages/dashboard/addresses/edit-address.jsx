import * as React from 'react';

import useSWR from 'swr';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';
import { useNavigate, useParams } from 'react-router';

import axios from '@/libs/axios';
import { useResultState } from '@/hooks/use-result-state';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import AddressForm from '@/components/addresses/form-address';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';

const EditAddress = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { mutate } = useSWRConfig();

	const { error, data, isLoading: loading } = useSWR(`/addresses/${id}`);
	const { result } = useResultState(error, loading, data);

	const onSubmit = async (data) => {
		try {
			await axios.put('/addresses/' + id, data, {
				headers: { 'Content-Type': 'application/json' },
			});

			toast('Address updated', {
				description: 'Successfully updated address',
			});

			mutate('/addresses');
			mutate('/addresses/' + id);
			navigate('/dashboard/addresses');
		} catch (error) {
			toast.error('Failed to update address', {
				description: error.response.data.message || error.message,
			});
			console.error(error);
		}
	};

	if (loading) return <Loading loading={loading} />;
	if (error) return <Error error={!loading && error} />;

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Edit Address</HeadingTitle>
				<HeadingDescription>
					Update your address information.
				</HeadingDescription>
			</Heading>

			<AddressForm initial={result} action={onSubmit} label='Update Address' />
		</div>
	);
};

export default EditAddress;
