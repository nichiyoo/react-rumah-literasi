import * as React from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';

import { cn } from '@/libs/utils';
import SidebarCard from '@/components/sidebar-card';
import { SIDEBAR_MENUS } from '@/libs/constant';

import axios, { isAxiosError } from '@/libs/axios';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

const Sidebar = ({ className }) => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await axios.post('/auth/signout');
			toast.success('Logout successful', {
				description: 'You are now logged out',
			});

			navigate('/auth/signin');
		} catch (error) {
			toast.error('Failed to logout', {
				description: isAxiosError(error)
					? error.response?.data?.message
					: error.message,
			});
		}
	};

	return (
		<aside className={cn('bg-zinc-100', className)}>
			<div className='flex flex-col justify-between h-full p-6 pt-10'>
				<div className='flex flex-col gap-6'>
					{SIDEBAR_MENUS.map((menu) => (
						<Accordion type='multiple' defaultValue={[menu.id]} key={menu.id}>
							<AccordionItem value={menu.id}>
								<AccordionTrigger>{menu.label}</AccordionTrigger>
								<AccordionContent className='ml-2'>
									<ul className='flex flex-col gap-6 text-sm'>
										{menu.submenus.map((menu) => {
											const Icon = menu.icon;
											return (
												<li key={menu.href}>
													<Link
														to={menu.href}
														className='flex items-center gap-4 font-medium rounded-md hover:text-primary-500'>
														<Icon className='size-5' />
														<span>{menu.label}</span>
													</Link>
												</li>
											);
										})}
									</ul>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}

					<Accordion type='multiple' defaultValue={['account']} key='account'>
						<AccordionItem value='account'>
							<AccordionTrigger>Account</AccordionTrigger>
							<AccordionContent className='ml-2'>
								<button
									onClick={handleLogout}
									className='flex items-center gap-4 font-medium rounded-md hover:text-red-500'>
									<LogOut className='size-5' />
									<span>Logout</span>
								</button>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>

				<SidebarCard />
			</div>
		</aside>
	);
};

export default Sidebar;
