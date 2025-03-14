import * as React from 'react';
import { Link, Outlet } from 'react-router';

import { Logo } from '@/components/ui/logo';
import Sidebar from '@/components/sidebar';
import Avatar from '@/components/avatar';

const DashboardLayout = () => {
	return (
		<div className='relative flex'>
			<div className='absolute w-full bg-white border-b'>
				<div className='flex h-16'>
					<div className='items-center justify-center flex-none hidden border-r lg:flex w-72'>
						<Link to='/'>
							<Logo />
						</Link>
					</div>

					<div className='flex items-center justify-between w-full gap-2 px-10'>
						<span>User Dashboard</span>
						<Avatar />
					</div>
				</div>
			</div>

			<Sidebar className='flex-none hidden h-screen pt-16 overflow-y-auto border-r lg:block w-72' />

			<div className='w-full h-screen pt-16 overflow-y-auto'>
				<div className='container p-10 max-w-7xl'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
