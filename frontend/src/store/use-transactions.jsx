import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_LOCATION } from '@/libs/constant';
import * as z from 'zod';

export const STEPS = {
	BOOKS: 0,
	RECIPIENT: 1,
	COURIER: 2,
};

const initialRecipient = {
	name: '',
	phone: '',
	address: '',
	note: '',
	...DEFAULT_LOCATION,
	borrowed_date: new Date().toISOString().split('T')[0],
};

const initialCourier = {
	zipcode: '',
	courier_company: '',
	courier_type: '',
};

const schemas = z.object({
	name: z.string().min(3),
	phone: z.string().min(11),
	address: z.string().min(3),
	note: z.string().optional(),
	borrowed_date: z.coerce.date(),
	latitude: z.coerce.number(),
	longitude: z.coerce.number(),
	zipcode: z.coerce.number(),
	courier_company: z.string().min(3),
	courier_type: z.string().min(3),
	books: z.array(
		z.object({
			id: z.coerce.string(),
			name: z.string().min(3),
			amount: z.coerce.number().min(1),
		})
	),
});

export const useTransactionStore = create(
	persist(
		(set, get) => ({
			step: STEPS.BOOKS,
			books: [],
			recipient: initialRecipient,
			courier: initialCourier,

			route: (step) => {
				return set({
					step: step,
				});
			},

			setRecipient: (recipient) => {
				return set((state) => {
					return {
						recipient: { ...state.recipient, ...recipient },
					};
				});
			},

			setCourier: (courier) => {
				return set((state) => {
					return {
						courier: { ...state.courier, ...courier },
					};
				});
			},

			append: (book) => {
				return set((state) => {
					const found = state.books.find((item) => item.book.id === book.id);

					if (!found) {
						return {
							books: [
								...state.books,
								{
									book: book,
									amount: 1,
								},
							],
						};
					}

					if (book.amount <= found.amount) {
						toast('Book already added', {
							description: 'All stock is already added to your cart',
						});

						return {
							books: state.books.map((item) => {
								if (item.book.id === book.id) {
									return {
										...item,
										amount: book.amount,
									};
								}
								return item;
							}),
						};
					}

					return {
						books: state.books.map((item) => {
							if (item.book.id === book.id) {
								return {
									...item,
									amount: item.amount + 1,
								};
							}
							return item;
						}),
					};
				});
			},

			reduce: (book) => {
				return set((state) => {
					const found = state.books.find((item) => item.book.id === book.id);

					if (!found) return { books: state.books };
					if (found.amount === 1) {
						return {
							books: state.books.filter((item) => item.book.id !== book.id),
						};
					}

					return {
						books: state.books.map((item) => {
							if (item.book.id === book.id) {
								return {
									...item,
									amount: Math.min(item.amount - 1, book.amount),
								};
							}
							return item;
						}),
					};
				});
			},

			remove: (book) => {
				return set((state) => {
					return {
						books: state.books.filter((item) => item.book.id !== book.id),
					};
				});
			},

			purge: () => {
				return set({
					books: [],
				});
			},

			reset: () => {
				return set({
					step: STEPS.BOOKS,
					books: [],
					recipient: initialRecipient,
					courier: initialCourier,
				});
			},

			validate: () => {
				return schemas.safeParse({
					...get().recipient,
					...get().courier,
					books: get().books.map((book) => ({
						id: book.book.id,
						name: book.book.title,
						amount: book.amount,
					})),
				});
			},
		}),
		{
			name: 'transaction-storage',
		}
	)
);
