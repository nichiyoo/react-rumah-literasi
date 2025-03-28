import * as React from 'react';
import { Plus, Minus } from 'lucide-react';
import { STEPS, useTransactionStore } from '@/store/use-transactions';

import { Empty } from '@/components/empty';
import { Button } from '@/components/ui/button';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import BookGrid from '@/components/books/book-grid';
import { toast } from 'sonner';
import { useConfirm } from '@/hooks/use-confirm';

const StepBook = () => {
	const { confirm } = useConfirm();
	const { books, append, reduce, purge, reset, route } = useTransactionStore();

	const handleSubmit = () => {
		if (books.length === 0) {
			toast('Please add books', {
				description: 'Please add books before proceeding',
			});
			return;
		}

		route(STEPS.RECIPIENT);
	};

	const handleReset = () => {
		confirm({
			title: 'Confirm Action',
			variant: 'destructive',
			description: 'Are you sure you want to reset data?',
		})
			.then(() => reset())
			.catch(() => {
				// pass
			});
	};

	return (
		<div className='relative grid gap-6 xl:grid-cols-3'>
			<BookGrid className='xl:col-span-2' />
			<div className='flex flex-col gap-6'>
				<div className='w-full overflow-x-auto border rounded-lg border-zinc-200'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Title</TableHead>
								<TableHead className='text-right'>Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{books.map((item) => (
								<TableRow key={item.book.id}>
									<TableCell>
										<p className='w-48 truncate'>{item.book.title}</p>
									</TableCell>
									<TableCell>
										<div className='flex justify-end gap-4'>
											<Minus
												onClick={() => reduce(item.book)}
												className='cursor-pointer text-zinc-400 hover:text-primary-500 size-5'
											/>
											<span>{item.amount}</span>
											<Plus
												onClick={() => append(item.book)}
												className='cursor-pointer text-zinc-400 hover:text-primary-500 size-5'
											/>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<Empty empty={books.length === 0} />
				</div>

				<div className='flex items-center justify-end gap-2 col-span-full'>
					<Button variant='destructive' onClick={handleReset}>
						Reset Data
					</Button>
					<Button variant='outline' onClick={() => purge()}>
						Remove All
					</Button>
					<Button onClick={handleSubmit}>Next</Button>
				</div>
			</div>
		</div>
	);
};

export default StepBook;
