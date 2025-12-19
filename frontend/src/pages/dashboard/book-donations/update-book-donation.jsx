import { useParams, useNavigate } from 'react-router';
import { useDonation } from '@/stores/use-donation';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import DonationItemForm from '@/components/book-donations/donation-item-form';

const UpdateBook = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { items, update } = useDonation();

	const onSubmit = async (data) => {
		try {
			update(Number(id), data);
			navigate('/dashboard/book-donations/create');
		} catch (error) {
			console.error(error);
		}
	};

	if (!id || !items.find((item) => item.id === Number(id))) {
		return <Navigate to='/dashboard/book-donations/create' />;
	}

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Edit Donation Item</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<DonationItemForm
				initial={items.find((item) => item.id === Number(id))}
				action={onSubmit}
				label='Update Item'
			/>
		</div>
	);
};

export default UpdateBook;
