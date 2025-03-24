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

export const SIDEBAR_MENUS = [
	{
		id: 'general',
		label: 'General',
		submenus: [
			{
				href: '/dashboard',
				label: 'Dashboard',
				icon: Home,
			},
			{
				href: '/dashboard/books',
				label: 'List Books',
				icon: Book,
			},
			{
				href: '/dashboard/events',
				label: 'List Events',
				icon: Calendar,
			},
			{
				href: '/dashboard/donations',
				label: 'List Donations',
				icon: HeartHandshake,
			},
			{
				href: '/dashboard/gifts',
				label: 'List Gifts',
				icon: Gift,
			},
			{
				href: '/dashboard/transactions',
				label: 'List Transactions',
				icon: Library,
			},
		],
	},
	{
		id: 'administrator',
		label: 'Administrator',
		submenus: [
			{
				href: '/dashboard/members',
				label: 'List Members',
				icon: UsersRound,
			},
			{
				href: '/dashboard/settings',
				label: 'Settings',
				icon: Bolt,
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
