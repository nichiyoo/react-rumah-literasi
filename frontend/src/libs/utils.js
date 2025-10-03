import clsx from 'clsx';
import confetti from 'canvas-confetti';
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

export const animate = () => {
	const duration = 5 * 1000;
	const end = Date.now() + duration;
	const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

	const range = (min, max) => Math.random() * (max - min) + min;

	const interval = window.setInterval(() => {
		const remaining = end - Date.now();

		if (remaining <= 0) return clearInterval(interval);
		const count = 50 * (remaining / duration);

		confetti({
			...defaults,
			particleCount: count,
			origin: { x: range(0.1, 0.3), y: Math.random() - 0.2 },
		});

		confetti({
			...defaults,
			particleCount: count,
			origin: { x: range(0.7, 0.9), y: Math.random() - 0.2 },
		});
	}, 250);
};

export const formatByte = (size) => {
	return Intl.NumberFormat('en', {
		notation: 'compact',
		style: 'unit',
		unit: 'byte',
		unitDisplay: 'narrow',
	}).format(size);
};

export const formatDate = (raw) => {
	const date = new Date(raw);
	return new Intl.DateTimeFormat('id-ID', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(date);
};
