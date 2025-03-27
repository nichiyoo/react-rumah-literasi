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

import MemberForm from '@/components/members/form-member';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';

const EditMember = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		error,
		mutate,
		data: result,
		isLoading: loading,
	} = useSWR('/members/' + id);

	const onSubmit = async (data) => {
		try {
			await axios.put('/members/' + result.data.uuid, data, {
				headers: { 'Content-Type': 'application/json' },
			});

			toast('Member updated', {
				description: 'Successfully updated member',
			});

			mutate();
			navigate('/dashboard/members');
		} catch (error) {
			toast.error('Failed to update member', {
				description: error.response.data.message || error.message,
			});
			console.error(error);
		}
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Edit Member</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<Loading loading={loading} />
			<Error error={error} loading={loading} />

			{result && (
				<MemberForm
					initial={result.data}
					action={onSubmit}
					label='Update Member'
				/>
			)}
		</div>
	);
};

export default EditMember;
