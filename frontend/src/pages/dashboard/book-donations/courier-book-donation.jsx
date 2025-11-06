import { Navigate, useNavigate } from 'react-router';
import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import { useConfirm } from '@/hooks/use-confirm';
import { useTransaction } from '@/stores/use-transaction';
import DonationCourierForm from '@/components/book-donations/donation-courier-form';

const DetailBookDonation = () => {
	const navigate = useNavigate();
	const { confirm } = useConfirm();
	const { detail, setCourier } = useTransaction();

	const onSubmit = (courier) => {
		confirm({
			title: 'Confirm Action',
			description: 'Are you sure you want to finish this book donation?',
		})
			.then(async () => {
				setCourier({
					zipcode: courier.zipcode,
					courier_company: courier.courier_code,
					courier_type: courier.courier_service_code,
				});
			})
			.catch(() => {
				// pass
			});
	};

	const onPrevious = () => {
		setCourier(null);
		navigate('/dashboard/book-donations/create/detail');
	};

	if (!detail) return <Navigate to='/dashboard/book-donations/create/detail' />;
	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Choose Courier</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<DonationCourierForm
				detail={detail}
				action={onSubmit}
				previous={onPrevious}
				label='Choose courier'
			/>
		</div>
	);
};

export default DetailBookDonation;
