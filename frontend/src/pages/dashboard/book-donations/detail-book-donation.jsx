import { Navigate, useNavigate } from 'react-router';
import { useTransaction } from '@/stores/use-transaction';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';
import DonationDetailForm from '@/components/book-donations/donation-detail-form';

const DetailBookDonation = () => {
	const navigate = useNavigate();
	const { items, detail, setDetail } = useTransaction();

	const onSubmit = async (data) => {
		try {
			setDetail(data);
			navigate('/dashboard/book-donations/create/courier');
		} catch (error) {
			console.error(error);
		}
	};

	const onPrevious = () => {
		setDetail(null);
		navigate('/dashboard/book-donations/create');
	};

	if (!items.length) return <Navigate to='/dashboard/book-donations/create' />;
	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Add Donation Detail</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<DonationDetailForm
				initial={detail}
				action={onSubmit}
				previous={onPrevious}
				label='Choose courier'
			/>
		</div>
	);
};

export default DetailBookDonation;
