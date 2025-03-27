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

import EventForm from '@/components/events/form-event';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';

const EditEvent = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		error,
		mutate,
		data: result,
		isLoading: loading,
	} = useSWR('/events/' + id);

	const onSubmit = async (data) => {
		try {
			await axios.put('/events/' + result.data.id, data, {
				headers: { 'Content-Type': 'application/json' },
			});

			toast('Event updated', {
				description: 'Successfully updated event',
			});

			mutate();
			navigate('/dashboard/events');
		} catch (error) {
			toast.error('Failed to update event', {
				description: error.response.data.message || error.message,
			});
			console.error(error);
		}
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Edit Event</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<Loading loading={loading} />
			<Error error={!loading && error} />

			{result && (
				<EventForm
					initial={result.data}
					action={onSubmit}
					label='Update Event'
				/>
			)}
		</div>
	);
};

export default EditEvent;
