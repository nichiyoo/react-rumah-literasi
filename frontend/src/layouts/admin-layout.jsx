import * as React from 'react';

import { Outlet, Navigate } from 'react-router';
import { useAuth } from '@/hooks/use-auth';

const AdminLayout = () => {
	const { user } = useAuth();
	const admin = user && user.role === 'admin';
	return admin ? <Outlet /> : <Navigate to={'/dashboard'} />;
};

export default AdminLayout;
