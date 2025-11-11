import { toast } from 'sonner';
import useSWR, { useSWRConfig } from 'swr';
import { useParams, useNavigate } from 'react-router';

import axios from '@/libs/axios';
import { useAuth } from '@/hooks/use-auth';
import { ROLES } from '@/libs/constant';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';
import BookDonationForm from '@/components/book-donations/form-book-donation';

const EditBookDonationMain = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	const { mutate } = useSWRConfig();

	const {
		error,
		data: result,
		isLoading: loading,
	} = useSWR('/book-donations/' + id);

	const allowed = [ROLES.LIBRARIAN, ROLES.SUPERADMIN].includes(user.role);

	const onSubmit = async (data) => {
		if (!allowed) {
			toast.error('Permission Denied', {
				description: 'You do not have permission to update this book donation',
			});
			return;
		}

		try {
			await axios.put('/book-donations/' + result.data.id, data);
			toast('Book donation updated', {
				description: 'Successfully updated book donation',
			});

			mutate('/book-donations');
			mutate('/book-donations/' + id);
			navigate('/dashboard/book-donations/' + id + '/detail');
		} catch (error) {
			toast.error('Failed to update book donation', {
				description: error.response?.data?.message || error.message,
			});
			console.error(error);
		}
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Edit Book Donation</HeadingTitle>
				<HeadingDescription>
					Update the status of this book donation.
				</HeadingDescription>
			</Heading>

			<Error error={!loading && error} />
			<Loading loading={loading} />

			{result && (
				<BookDonationForm
					initial={result.data}
					action={onSubmit}
					label='Update Status'
				/>
			)}
		</div>
	);
};

export default EditBookDonationMain;
