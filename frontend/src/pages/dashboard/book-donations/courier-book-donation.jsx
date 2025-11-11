import * as React from 'react';
import { Navigate, useNavigate } from 'react-router';
import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import { useDonation } from '@/stores/use-donation';
import DonationCourierForm from '@/components/book-donations/donation-courier-form';

const CourierBookDonation = () => {
	const navigate = useNavigate();
	const { detail, setCourier } = useDonation();

	const onSubmit = (courier) => {
		setCourier({
			zipcode: courier.zipcode.toString(),
			courier_company: courier.courier_code,
			courier_type: courier.courier_service_code,
			price: courier.price,
		});
		navigate('/dashboard/book-donations/create/review');
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
					Select the courier service for your book donation delivery.
				</HeadingDescription>
			</Heading>

			<DonationCourierForm
				detail={detail}
				action={onSubmit}
				previous={onPrevious}
				label='Choose Courier'
			/>
		</div>
	);
};

export default CourierBookDonation;
