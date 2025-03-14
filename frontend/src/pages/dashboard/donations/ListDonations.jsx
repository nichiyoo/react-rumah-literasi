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

const ListDonations = () => {
	const [donations, setDonations] = React.useState(null);

	React.useEffect(() => {
		const fetchDonations = async () => {
			try {
				const { data } = await axios.get('/donations');
				const { data: donations } = data;
				setDonations(donations);
			} catch (error) {
				console.error(error);
			}
		};

		fetchDonations();
	}, []);

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Donations List</HeadingTitle>
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
							<TableHead>Account</TableHead>
							<TableHead>Receipt</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{donations && donations.length > 0 ? (
							donations.map((donation) => (
								<TableRow key={donation.id}>
									<TableCell>{donation.account}</TableCell>
									<TableCell>{donation.receipt}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={3} className='py-10 text-center'>
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

export default ListDonations;
