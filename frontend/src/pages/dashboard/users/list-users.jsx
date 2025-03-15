import * as React from 'react';

import useSWR from 'swr';
import { toast } from 'sonner';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-confirm';
import axios, { fetcher, isAxiosError } from '@/libs/axios';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const ListUsers = () => {
	const { confirm } = useConfirm();

	const {
		error,
		mutate,
		data: result,
		isLoading: loading,
	} = useSWR('/users', fetcher);
	const empty = result && result.data.length == 0;

	const handleDelete = async (uuid) => {
		confirm({
			title: 'Confirm Order',
			variant: 'desctructive',
			description: 'Are you sure you want to delete this record?',
		})
			.then(async () => {
				try {
					await axios.delete('/users/' + uuid);
					mutate();
					toast('User deleted', {
						description: 'Successfully deleted user',
					});
				} catch (error) {
					toast.error('Failed to delete user', {
						description: isAxiosError(error)
							? error.response.data.message
							: error.message,
					});
					console.log(error);
				}
			})
			.catch(() => {
				// pass
			});
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>User List</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>

				<div className='flex items-center justify-end'>
					<Link to='/dashboard/users/create'>
						<Button>Create User</Button>
					</Link>
				</div>
			</Heading>

			<div className='w-full overflow-x-auto border rounded-lg border-zinc-200'>
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
						{loading && (
							<TableRow>
								<TableCell colSpan={4} className='py-10 text-center'>
									<span className='text-zinc-500'>Loading data...</span>
								</TableCell>
							</TableRow>
						)}

						{error && (
							<TableRow>
								<TableCell colSpan={4} className='py-10 text-center'>
									<span className='text-zinc-500'>Failed to load data</span>
								</TableCell>
							</TableRow>
						)}

						{empty && (
							<TableRow>
								<TableCell colSpan={4} className='py-10 text-center'>
									<span className='text-zinc-500'>No data found</span>
								</TableCell>
							</TableRow>
						)}

						{result?.data.map((user) => (
							<TableRow key={user.uuid}>
								<TableCell>
									<div className='flex items-center gap-4'>
										<img
											alt={user.name}
											src={
												'https://ui-avatars.com/api/?bold=true&font-size=0.33&format=svg&background=f4f4f5&name=' +
												user.name
											}
											className='flex-none border rounded-full size-10 border-zinc-200'
										/>
										<span className='font-medium'>{user.name}</span>
									</div>
								</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.role}</TableCell>
								<TableCell>
									<div className='flex items-center gap-2'>
										<Link to={'/dashboard/users/' + user.uuid}>
											<button className='bg-transparent hover:text-amber-500'>
												Edit
											</button>
										</Link>
										<button
											onClick={() => handleDelete(user.uuid)}
											className='bg-transparent hover:text-red-500'>
											Delete
										</button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default ListUsers;
