import { X } from 'lucide-react';
import { Link } from 'react-router';

import { STEPS } from '@/libs/constant';
import { useConfirm } from '@/hooks/use-confirm';
import { useTransaction } from '@/stores/use-transaction';

import { TransactionItem } from '@/components/book-donations/donation-item-card';
import { Button } from '@/components/ui/button';
import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';
import { Empty } from '@/components/empty';

const CreateBookDonation = () => {
	const { confirm } = useConfirm();
	const { items, route, remove, purge } = useTransaction();

	const handleReset = () => {
		confirm({
			title: 'Confirm Action',
			variant: 'destructive',
			description: 'Are you sure you want to reset this form?',
		})
			.then(async () => {
				purge();
			})
			.catch(() => {
				// pass
			});
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Create Book Donation</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<div className='grid items-start grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
				{items.map((item) => (
					<div className='relative group' key={item.id}>
						<Link to={'/dashboard/book-donations/create/' + item.id + '/edit'}>
							<TransactionItem item={item} />
						</Link>
						<div className='absolute top-0 right-0 m-4'>
							<button
								type='button'
								onClick={() => remove(item.id)}
								className='items-center justify-center hidden bg-white rounded-full size-8 group-hover:flex'>
								<X className='size-4' />
							</button>
						</div>
					</div>
				))}
				<Empty empty={!items.length} />
			</div>

			<div className='col-span-full'>
				<div className='flex items-center gap-2'>
					<Button onClick={() => route(STEPS.DETAIL)}>Continue</Button>
					<Link to='/dashboard/book-donations/create/append'>
						<Button variant='outline'>Add item</Button>
					</Link>
					<Button variant='destructive' onClick={() => handleReset()}>
						Remove
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CreateBookDonation;
