import * as React from 'react';
import { Link } from 'react-router';

import { cn } from '@/libs/utils';
import SidebarCard from '@/components/SidebarCard';
import { SIDEBAR_MENUS } from '@/libs/constant';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/Accordion';

const Sidebar = ({ className }) => {
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
				</div>

				<SidebarCard />
			</div>
		</aside>
	);
};

export default Sidebar;
