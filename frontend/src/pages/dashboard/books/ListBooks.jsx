import * as React from 'react';

import useSWR from 'swr';
import { Link } from 'react-router';

import { fetcher } from '@/libs/axios';
import { Button } from '@/components/ui/Button';

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

const ListBooks = () => {
	const { data, error, isLoading } = useSWR('/books', fetcher);

	const result = data;
	const loading = isLoading;
	const empty = result && result.data.length == 0;

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Book List</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>

				<div className='flex items-center justify-end'>
					<Link to='/dashboard/books/create'>
						<Button>Create Book</Button>
					</Link>
				</div>
			</Heading>

			<div className='w-full overflow-x-auto border rounded-lg border-zinc-200'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Author</TableHead>
							<TableHead>Publisher</TableHead>
							<TableHead>Year</TableHead>
							<TableHead>Language</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading && (
							<TableRow>
								<TableCell colSpan={7} className='py-10 text-center'>
									<span className='text-zinc-500'>Loading data...</span>
								</TableCell>
							</TableRow>
						)}

						{error && (
							<TableRow>
								<TableCell colSpan={7} className='py-10 text-center'>
									<span className='text-zinc-500'>Failed to load data</span>
								</TableCell>
							</TableRow>
						)}

						{empty && (
							<TableRow>
								<TableCell colSpan={7} className='py-10 text-center'>
									<span className='text-zinc-500'>No data found</span>
								</TableCell>
							</TableRow>
						)}

						{result?.data.map((book) => (
							<TableRow key={book.id}>
								<TableCell>{book.title}</TableCell>
								<TableCell>{book.author}</TableCell>
								<TableCell>{book.publisher}</TableCell>
								<TableCell>{book.year}</TableCell>
								<TableCell>{book.language}</TableCell>
								<TableCell>{book.amount}</TableCell>
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

export default ListBooks;
