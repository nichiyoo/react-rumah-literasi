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

const ListUsers = () => {
	const [users, setUsers] = React.useState(null);

	React.useEffect(() => {
		const fetchUser = async () => {
			try {
				const { data } = await axios.get('/users');
				const { data: users } = data;
				setUsers(users);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUser();
	}, []);

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>User List</HeadingTitle>
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
							<TableHead>Nama</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users && users.length > 0 ? (
							users.map((user) => (
								<TableRow key={user.uuid}>
									<TableCell>{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.role}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={4} className='py-10 text-center'>
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

export default ListUsers;
