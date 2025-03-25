import * as React from 'react';

import { Outlet, Navigate } from 'react-router';
import { useAuth } from '@/hooks/use-auth';
import Loading from '@/components/loading';

const AdminLayout = () => {
	const { user, loading } = useAuth();
	const admin = user && user.role === 'admin';

	if (loading) {
		return (
			<div className='grid gap-8'>
				<div className='grid gap-2'>
					<div className='w-1/3 h-10 bg-zinc-100 animate-pulse rounded-xl' />
					<div className='flex flex-col gap-2'>
						<div className='w-full h-4 bg-zinc-100 animate-pulse rounded-xl' />
						<div className='w-1/2 h-4 bg-zinc-100 animate-pulse rounded-xl' />
					</div>
				</div>
				<Loading />
			</div>
		);
	}

	return admin ? <Outlet /> : <Navigate to={'/dashboard'} />;
};

export default AdminLayout;
