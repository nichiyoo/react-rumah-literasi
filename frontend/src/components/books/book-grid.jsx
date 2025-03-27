import useSWR from 'swr';
import * as React from 'react';
import { cn } from '@/libs/utils';

import { useTransactionStore } from '@/store/use-transactions';
import { useResultState } from '@/hooks/use-result-state';

import { BookCard } from '@/components/books/book-card';
import { Loading } from '@/components/loading';
import { Empty } from '@/components/empty';
import { Error } from '@/components/error';

const BookGrid = ({ className }) => {
	const { append } = useTransactionStore();
	const { error, data, isLoading: loading } = useSWR('/books');
	const { result, empty } = useResultState(error, loading, data);

	return (
		<div
			className={cn(
				'grid grid-cols-3 md:grid-cols-4 gap-6 lg:grid-cols-4',
				className
			)}>
			{result.map((book) => (
				<BookCard book={book} key={book.id} onClick={() => append(book)} />
			))}

			<Error error={!loading && error} />
			<Empty empty={!loading && empty} />
			<Loading loading={loading} />
		</div>
	);
};

export default BookGrid;
