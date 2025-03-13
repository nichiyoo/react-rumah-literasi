import * as React from 'react';
import { Outlet } from 'react-router';

const AdminLayout = () => {
	return (
		<div className='relative flex'>
			<aside className='h-screen text-white w-72 bg-primary-500'>
				<div className='w-full h-16 bg-black'></div>
				<div className='w-full h-16 bg-black'></div>
				<div className='w-full h-16 bg-black'></div>
				<div className='w-full h-16 bg-black'></div>
				<div className='w-full h-16 bg-black'></div>
				<div className='w-full h-16 bg-black'></div>
			</aside>

			<div className='h-screen overflow-y-auto'>
				<Outlet />
			</div>
		</div>
	);
};

export default AdminLayout;
