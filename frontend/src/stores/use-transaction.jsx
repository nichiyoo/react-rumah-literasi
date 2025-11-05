import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { STEPS } from '@/libs/constant';
import { transactionSchema } from '@/libs/schemas';

const initial = [
	{
		id: 1,
		isbn: '9780743273565',
		title: 'The Great Gatsby',
		author: 'F. Scott Fitzgerald',
		publisher: 'Scribner',
		year: 1925,
		language: 'English',
		amount: 5,
	},
	{
		id: 2,
		isbn: '9780439139601',
		title: 'Harry Potter and the Goblet of Fire',
		author: 'J.K. Rowling',
		publisher: 'Bloomsbury',
		year: 2000,
		language: 'English',
		amount: 12,
	},
	{
		id: 3,
		isbn: '9780140449266',
		title: 'The Odyssey',
		author: 'Homer',
		publisher: 'Penguin Classics',
		year: -700,
		language: 'Greek',
		amount: 4,
	},
	{
		id: 4,
		isbn: '9780307277671',
		title: 'The Road',
		author: 'Cormac McCarthy',
		publisher: 'Vintage Books',
		year: 2006,
		language: 'English',
		amount: 6,
	},
	{
		id: 5,
		isbn: '9780553296983',
		title: 'Dune',
		author: 'Frank Herbert',
		publisher: 'Ace Books',
		year: 1965,
		language: 'English',
		amount: 8,
	},
	{
		id: 6,
		isbn: '9780451524935',
		title: '1984',
		author: 'George Orwell',
		publisher: 'Signet Classics',
		year: 1949,
		language: 'English',
		amount: 7,
	},
	{
		id: 7,
		isbn: '9780061120084',
		title: 'To Kill a Mockingbird',
		author: 'Harper Lee',
		publisher: 'Harper Perennial',
		year: 1960,
		language: 'English',
		amount: 10,
	},
	{
		id: 8,
		isbn: '9780141439600',
		title: 'Pride and Prejudice',
		author: 'Jane Austen',
		publisher: 'Penguin Classics',
		year: 1813,
		language: 'English',
		amount: 5,
	},
	{
		id: 9,
		isbn: '9780307387899',
		title: 'The Kite Runner',
		author: 'Khaled Hosseini',
		publisher: 'Riverhead Books',
		year: 2003,
		language: 'English',
		amount: 9,
	},
];

export const useTransaction = create(
	persist(
		(set, get) => ({
			step: STEPS.ITEMS,
			items: initial,
			detail: null,
			courier: null,

			route: (step) => set({ step: step }),
			setDetail: (detail) => set({ detail }),
			setCourier: (courier) => set({ courier }),

			append: (item) => {
				return set((state) => {
					return {
						items: [
							...state.items,
							{
								id: new Date().getTime(),
								...item,
							},
						],
					};
				});
			},

			update: (id, updated) => {
				return set((state) => {
					return {
						items: state.items.map((item) => {
							if (item.id === id) {
								return {
									...item,
									...updated,
								};
							}

							return item;
						}),
					};
				});
			},

			remove: (id) => {
				return set((state) => {
					return {
						items: state.items.filter((item) => item.id !== id),
					};
				});
			},

			purge: () => {
				return set({
					items: [],
				});
			},

			reset: () => {
				return set({
					step: STEPS.ITEMS,
					items: [],
					address: null,
					detail: null,
					courier: null,
				});
			},

			validate: () => {
				const { items, detail, courier } = get();
				return transactionSchema.parse({
					items,
					detail,
					courier,
				});
			},
		}),
		{
			name: 'book-donation-storage',
		}
	)
);
