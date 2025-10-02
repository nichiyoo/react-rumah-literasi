import { UsersRound } from 'lucide-react';
import { Gift } from 'lucide-react';
import {
	Phone,
	Instagram,
	Facebook,
	HeartHandshake,
	Bolt,
	Library,
	Calendar,
	Twitter,
	Mail,
	Globe,
	Book,
	Home,
} from 'lucide-react';

export const ROLES = {
	GUEST: 'guest',
	ADMIN: 'admin',
	LIBRARIAN: 'librarian',
	SUPERADMIN: 'superadmin',
};

export const SIDEBAR_MENUS = [
	{
		id: 'general',
		label: 'General',
		submenus: [
			{
				href: '/dashboard',
				label: 'Dashboard',
				icon: Home,
				roles: null,
			},
			{
				href: '/dashboard/books',
				label: 'Manage Books',
				icon: Book,
				roles: [ROLES.LIBRARIAN, ROLES.SUPERADMIN],
			},
			{
				href: '/dashboard/events',
				label: 'Manage Events',
				icon: Calendar,
				roles: [ROLES.ADMIN, ROLES.SUPERADMIN],
			},
			{
				href: '/dashboard/book-donations',
				label: 'Book Donation',
				icon: Gift,
				roles: [ROLES.GUEST, ROLES.ADMIN, ROLES.SUPERADMIN],
			},
			{
				href: '/dashboard/financial-donations',
				label: 'Financial Donations',
				icon: HeartHandshake,
				roles: [ROLES.GUEST, ROLES.ADMIN, ROLES.SUPERADMIN],
			},
			{
				href: '/dashboard/transactions',
				label: 'Transactions',
				icon: Library,
				roles: [ROLES.GUEST, ROLES.LIBRARIAN, ROLES.SUPERADMIN],
			},
		],
	},
	{
		id: 'configuration',
		label: 'Configuration',
		submenus: [
			{
				href: '/dashboard/members',
				label: 'Members',
				icon: UsersRound,
				roles: [ROLES.SUPERADMIN],
			},
			{
				href: '/dashboard/settings',
				label: 'Settings',
				icon: Bolt,
				roles: null,
			},
		],
	},
];

export const WIDGET_NAV = [
	{
		href: '/',
		label: 'Home',
	},
	{
		href: '/company',
		label: 'Our Company',
	},
	{
		href: '/about',
		label: 'About Us',
	},
	{
		href: '/contact',
		label: 'Contact and Support',
	},
	{
		href: '/faq',
		label: 'Frequently Asked Questions',
	},
];

export const WIDGET_CONTACT = [
	{
		href: 'https://rumah-literasi.com',
		label: 'rumah-literasi.com',
		icon: Globe,
	},
	{
		href: 'tel:+6285735146647',
		label: '+6285735146647',
		icon: Phone,
	},
	{
		href: 'mailto:info@rumah-literasi.com',
		label: 'info@rumah-literasi.com',
		icon: Mail,
	},
];

export const WIDGET_SOCIAL = [
	{
		href: 'https://instagram.com/rumahliterasi',
		label: '@rumahliterasi',
		icon: Instagram,
	},
	{
		href: 'https://twitter.com/rumahliterasi',
		label: '@rumahliterasi',
		icon: Twitter,
	},
	{
		href: 'https://facebook.com/rumahliterasi',
		label: 'Rumah Literasi',
		icon: Facebook,
	},
];

export const ERROR_MESSAGES = {
	401: 'You are not authenticated, please login to access this resource',
	403: 'You are not authorized to access this resource',
	404: 'Resource not found, please try again later',
	429: 'You have exceeded the rate limit, try again later',
	500: 'Internal server error, try again later',
};

export const DEFAULT_LOCATION = {
	latitude: -6.1741855,
	longitude: 106.8283465,
};
