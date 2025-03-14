import * as React from 'react';

import useSWR from 'swr';
import { Link } from 'react-router';

import { fetcher } from '@/libs/axios';
import { Button } from '@/components/ui/button';

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

const ListGifts = () => {
	const { data, error, isLoading } = useSWR('/gifts', fetcher);

	const result = data;
	const loading = isLoading;
	const empty = result && result.data.length == 0;

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Gifts List</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>

				<div className='flex items-center justify-end'>
					<Link to='/dashboard/gifts/create'>
						<Button>Create Gift</Button>
					</Link>
				</div>
			</Heading>

			<div className='w-full overflow-x-auto border rounded-lg border-zinc-200'>
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
						{loading && (
							<TableRow>
								<TableCell colSpan={5} className='py-10 text-center'>
									<span className='text-zinc-500'>Loading data...</span>
								</TableCell>
							</TableRow>
						)}

						{error && (
							<TableRow>
								<TableCell colSpan={5} className='py-10 text-center'>
									<span className='text-zinc-500'>Failed to load data</span>
								</TableCell>
							</TableRow>
						)}

						{empty && (
							<TableRow>
								<TableCell colSpan={5} className='py-10 text-center'>
									<span className='text-zinc-500'>No data found</span>
								</TableCell>
							</TableRow>
						)}

						{result?.data.map((gift) => (
							<TableRow key={gift.id}>
								<TableCell>{gift.title}</TableCell>
								<TableCell>{gift.genre}</TableCell>
								<TableCell>{gift.amount}</TableCell>
								<TableCell>{gift.address}</TableCell>
								<TableCell>
									<div className='flex items-center gap-2'>
										<button className='bg-transparent hover:text-amber-500'>
											Edit
										</button>
										<button className='bg-transparent hover:text-red-500'>
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

export default ListGifts;
