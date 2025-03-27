import * as React from 'react';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';
import { HeartHandshake, Gift, Book } from 'lucide-react';
import { Link } from 'react-router';
import { Library } from 'lucide-react';

const Dashboard = () => {
	const menus = [
		{
			href: '/dashboard/donations',
			title: 'List Donations',
			icon: HeartHandshake,
			description:
				'Track and manage donation transactions, processed via our payment gateway.',
		},
		{
			href: '/dashboard/gifts',
			title: 'List Gifts',
			icon: Gift,
			description:
				'Oversee book donations, verify records, and manage distributions.',
		},
		{
			href: '/dashboard/transactions',
			title: 'List Transactions',
			icon: Library,
			description:
				'Manage book borrowing transactions, track loaned books, and oversee returns.',
		},
	];

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Dashboard</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<div className='grid gap-6 lg:grid-cols-2 2xl:grid-cols-3'>
				{menus.map((menu) => {
					const Icon = menu.icon;
					return (
						<Link
							key={menu.href}
							to={menu.href}
							className='p-8 border border-zinc-200 rounded-2xl hover:border-primary-500'>
							<div className='flex items-start gap-4'>
								<div className='relative flex-none text-white rounded-full bg-primary-500 size-10'>
									<Icon className='size-5 absolute-center' />
								</div>
								<div className='flex flex-col gap-2'>
									<h3 className='font-semibold'>{menu.title}</h3>
									<p className='text-zinc-600'>{menu.description}</p>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Dashboard;
