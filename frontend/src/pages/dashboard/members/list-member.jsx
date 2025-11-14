import * as React from 'react';

import useSWR from 'swr';
import { toast } from 'sonner';
import { Link } from 'react-router';

import axios from '@/libs/axios';
import { useConfirm } from '@/hooks/use-confirm';
import { useResultState } from '@/hooks/use-result-state';

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

import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/components/loading';
import { Empty } from '@/components/empty';
import { Error } from '@/components/error';

const ListMembers = () => {
	const { confirm } = useConfirm();
	const { error, mutate, data, isLoading: loading } = useSWR('/members');
	const { result, empty } = useResultState(error, loading, data);

	const handleDelete = async (uuid) => {
		confirm({
			title: 'Confirm Action',
			variant: 'destructive',
			description: 'Are you sure you want to delete this record?',
		})
			.then(async () => {
				try {
					await axios.delete('/members/' + uuid);
					mutate();
					toast('Member deleted', {
						description: 'Successfully deleted member',
					});
				} catch (error) {
					toast.error('Failed to delete member', {
						description: error.response?.data?.message || error.message,
					});
					console.error(error);
				}
			})
			.catch(() => {
				// pass
			});
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Member List</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>

				<div className='flex items-center justify-end'>
					<Link to='/dashboard/members/create'>
						<Button>Create Member</Button>
					</Link>
				</div>
			</Heading>

			<div className='w-full overflow-x-auto border rounded-xl border-zinc-200'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Verified</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{result.map((member) => (
							<TableRow key={member.uuid}>
								<TableCell>
									<div className='flex items-center gap-4'>
										<Avatar name={member.name} className='flex-none' />
										<span className='font-medium'>{member.name}</span>
									</div>
								</TableCell>
								<TableCell>{member.email}</TableCell>
								<TableCell>{member.role}</TableCell>
								<TableCell>
									<Badge>{member.is_verified ? 'Yes' : 'No'}</Badge>
								</TableCell>
								<TableCell>
									<div className='flex items-center gap-2'>
										<Link to={member.uuid + '/edit'} relative='path'>
											<button className='bg-transparent hover:text-amber-500'>
												Edit
											</button>
										</Link>
										<button
											onClick={() => handleDelete(member.uuid)}
											className='bg-transparent hover:text-red-500'>
											Delete
										</button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				<Error error={!loading && error} />
				<Empty empty={!loading && empty} />
				<Loading loading={loading} />
			</div>
		</div>
	);
};

export default ListMembers;
