import DonationItemForm from '@/components/book-donations/donation-item-form';
import BookDonationForm from '@/components/book-donations/donation-item-form';
import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import { useTransaction } from '@/stores/use-transaction';
import { useNavigate } from 'react-router';

const CreateBook = () => {
	const { append } = useTransaction();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			append(data);
			navigate('/dashboard/book-donations/create');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Add Donation Item</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<DonationItemForm action={onSubmit} label='Append Item' />
		</div>
	);
};

export default CreateBook;
