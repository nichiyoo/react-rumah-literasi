import * as React from 'react';
import { toast } from 'sonner';
import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

import { cn } from '@/libs/utils';
import { useAuth } from '@/hooks/use-auth';
import { ADMIN_MENUS, MEMBER_MENUS } from '@/libs/constant';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

import SidebarCard from '@/components/sidebar-card';
import { useLocation } from 'react-router';
import { User2 } from 'lucide-react';

const Sidebar = ({ className }) => {
	const { user, loading, signout } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();

	const MENUS = React.useMemo(() => {
		if (loading) return [];
		if (user && user.role === 'admin') return ADMIN_MENUS;
		return MEMBER_MENUS;
	}, [loading, user]);

	const handleLogout = async () => {
		try {
			await signout();
			toast('Logout successful', {
				description: 'You are now logged out',
			});
			navigate('/auth/signin');
		} catch (error) {
			toast.error('Failed to logout', {
				description: error.response.data.message || error.message,
			});
		}
	};

	return (
		<aside className={cn('bg-zinc-100', className)}>
			<div className='flex flex-col justify-between h-full p-6 pt-10'>
				<div className='flex flex-col gap-6'>
					{MENUS.map((menu) => (
						<Accordion type='multiple' defaultValue={[menu.id]} key={menu.id}>
							<AccordionItem value={menu.id}>
								<AccordionTrigger>{menu.label}</AccordionTrigger>
								<AccordionContent className='ml-2'>
									<ul className='flex flex-col gap-6 text-sm'>
										{menu.submenus.map((menu) => {
											const Icon = menu.icon;
											const active = location.pathname === menu.href;
											return (
												<li key={menu.href}>
													<Link
														to={menu.href}
														className={cn(
															'flex items-center gap-4 font-medium rounded-md hover:text-primary-500',
															active && 'text-primary-500'
														)}>
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
								<ul className='flex flex-col gap-6 text-sm'>
									<Link
										to='/dashboard/profile'
										className='flex items-center gap-4 font-medium rounded-md hover:text-red-500'>
										<User2 className='size-5' />
										<span>Profile</span>
									</Link>

									<button
										onClick={handleLogout}
										className='flex items-center gap-4 font-medium rounded-md hover:text-red-500'>
										<LogOut className='size-5' />
										<span>Logout</span>
									</button>
								</ul>
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
