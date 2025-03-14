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

const ListBooks = () => {
	const [books, setBooks] = React.useState(null);

	React.useEffect(() => {
		const fetchBooks = async () => {
			try {
				const { data } = await axios.get('/books');
				const { data: users } = data;
				setBooks(users);
			} catch (error) {
				console.error(error);
			}
		};

		fetchBooks();
	}, []);

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Book List</HeadingTitle>
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
							<TableHead>Author</TableHead>
							<TableHead>Publisher</TableHead>
							<TableHead>Year</TableHead>
							<TableHead>Language</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{books && books.length > 0 ? (
							books.map((book) => (
								<TableRow key={book.id}>
									<TableCell>{book.title}</TableCell>
									<TableCell>{book.author}</TableCell>
									<TableCell>{book.publisher}</TableCell>
									<TableCell>{book.year}</TableCell>
									<TableCell>{book.language}</TableCell>
									<TableCell>{book.amount}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={7} className='py-10 text-center'>
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

export default ListBooks;
