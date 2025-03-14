import * as React from 'react';
import axios from '@/libs/axios';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/Heading';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const ListGifts = () => {
	const [gifts, setGifts] = React.useState(null);

	React.useEffect(() => {
		const fetchGifts = async () => {
			try {
				const { data } = await axios.get('/gifts');
				const { data: gifts } = data;
				setGifts(gifts);
			} catch (error) {
				console.error(error);
			}
		};

		fetchGifts();
	}, []);

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Gifts List</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<div className='w-full overflow-x-auto border border-gray-200 rounded-lg'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Genre</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Address</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{gifts && gifts.length > 0 ? (
							gifts.map((gift) => (
								<TableRow key={gift.id}>
									<TableCell>{gift.title}</TableCell>
									<TableCell>{gift.genre}</TableCell>
									<TableCell>{gift.amount}</TableCell>
									<TableCell>{gift.address}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} className='py-10 text-center'>
									<span className='text-gray-500'>
										Tidak ada data yang ditemukan
									</span>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default ListGifts;
