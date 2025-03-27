import useSWR from 'swr';
import * as React from 'react';
import { cn } from '@/libs/utils';

import { useTransactionStore } from '@/store/use-transactions';

import { Loading } from '@/components/loading';
import { Empty } from '@/components/empty';
import { BookCard } from '@/components/books/book-card';

const BookGrid = ({ className }) => {
	const { append } = useTransactionStore();

	const {
		error,
		data: result = { data: [] },
		isLoading: loading,
	} = useSWR('/books');

	const empty = !error && !loading && result.data.length == 0;

	const duplicate = React.useMemo(() => {
		return {
			data: Array.from({ length: 20 }, (_, i) => ({
				...result.data[i % result.data.length],
				id: i,
				amount: 1,
			})),
		};
	}, [result]);

	return (
		<div
			className={cn(
				'grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4',
				className
			)}>
			{error ? (
				<Error error={error} loading={loading} />
			) : (
				duplicate.data.map((book) => (
					<BookCard book={book} key={book.id} onClick={() => append(book)} />
				))
			)}

			<Empty empty={!loading && empty} />
			<Loading loading={loading} />
		</div>
	);
};

export default BookGrid;
