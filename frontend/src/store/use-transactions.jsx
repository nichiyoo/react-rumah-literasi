import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const STEPS = {
	BOOKS: 0,
	RECIPIENT: 1,
	DELIVERY: 2,
};

const initialRecipient = {
	phone: '',
	address: '',
	zipcode: '',
	borrowed_date: new Date().toISOString().split('T')[0],
};

const initialDelivery = {
	courier: '',
	tracking_id: '',
	delivery_fee: 0,
};

export const useTransactionStore = create(
	persist(
		(set) => ({
			step: STEPS.BOOKS,
			books: [],
			recipient: initialRecipient,
			delivery: initialDelivery,

			advance: (step) => {
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

			setDelivery: (delivery) => {
				return set((state) => {
					return {
						delivery: { ...state.delivery, ...delivery },
					};
				});
			},

			append: (book) => {
				return set((state) => {
					const found = state.books.find((item) => item.book.id === book.id);

					if (found) {
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
					}

					return {
						books: [
							...state.books,
							{
								book: book,
								amount: 1,
							},
						],
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
									amount: item.amount - 1,
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
					delivery: initialDelivery,
				});
			},
		}),
		{
			name: 'transaction-storage',
		}
	)
);
