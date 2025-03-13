import * as React from 'react';
import { Link } from 'react-router';

import { Logo } from '@/components/ui/Logo';
import { WIDGET_CONTACT, WIDGET_NAV, WIDGET_SOCIAL } from '@/libs/constant';

const Footer = () => {
	return (
		<div className='grid gap-6'>
			<Link to='/'>
				<Logo />
			</Link>

			<div className='grid gap-8 lg:grid-cols-5'>
				<p className='lg:col-span-2'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>

				<div className='div'>
					<h5 className='mb-4 font-semibold'>Navigation</h5>
					<ul className='flex flex-col gap-3'>
						{WIDGET_NAV.map((menu) => (
							<li key={menu.href}>
								<Link to={menu.href} className='hover:text-primary-500'>
									{menu.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h5 className='mb-4 font-semibold'>Contact</h5>
					<ul className='flex flex-col gap-3'>
						{WIDGET_CONTACT.map((menu) => {
							const Icon = menu.icon;
							return (
								<li key={menu.href}>
									<Link
										to={menu.href}
										className='flex items-center gap-3 hover:text-primary-500'>
										<Icon className='size-5' />
										<span>{menu.label}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</div>

				<div>
					<h5 className='mb-4 font-semibold'>Social</h5>
					<ul className='flex flex-col gap-3'>
						{WIDGET_SOCIAL.map((menu) => {
							const Icon = menu.icon;
							return (
								<li key={menu.href}>
									<Link
										to={menu.href}
										className='flex items-center gap-3 hover:text-primary-500'>
										<Icon className='size-5' />
										<span>{menu.label}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Footer;
