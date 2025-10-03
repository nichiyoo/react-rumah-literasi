import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';
import { HeartHandshake, Gift } from 'lucide-react';
import { Link } from 'react-router';

const Dashboard = () => {
	const menus = [
		{
			href: '/dashboard/financial-donations',
			title: 'Financial Donations',
			icon: HeartHandshake,
			description:
				'Track and manage financial donation, processed via our payment gateway.',
		},
		{
			href: '/dashboard/book-donations',
			title: 'Book Donations',
			icon: Gift,
			description:
				'Oversee book donations, verify records, and manage distributions.',
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

			<div className='grid gap-6 lg:grid-cols-2'>
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
