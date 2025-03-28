import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => {
	return twMerge(clsx(inputs));
};

export const currency = (value) => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(value);
};
