import { fontFamily } from 'tailwindcss/defaultTheme';

import colors from 'tailwindcss/colors';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '2rem',
			},
			fontFamily: {
				sans: ['var(--font-sans)', ...fontFamily.sans],
			},
			colors: {
				primary: colors.teal,
				temporary: {
					50: '#eff6ff',
					100: '#dbebfe',
					200: '#c0dcfd',
					300: '#94c7fc',
					400: '#62a8f8',
					500: '#5092f5',
					600: '#2768e9',
					700: '#1f53d6',
					800: '#2044ad',
					900: '#1f3d89',
					950: '#182653',
				},
			},
			aspectRatio: {
				thumbnail: '4 / 3',
				banner: '3 / 1',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'slow-hover': 'slow-hover 2s ease-out infinite',
			},
		},
	},
	plugins: [forms],
};
