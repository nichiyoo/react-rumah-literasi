import { BrowserRouter, Route, Routes } from 'react-router';

import AuthLayout from '@/layouts/AuthLayout.jsx';
import AdminLayout from '@/layouts/AdminLayout.jsx';
import LandingLayout from '@/layouts/LandingLayout.jsx';
import DashboardLayout from '@/layouts/DashboardLayout.jsx';

import Home from '@/pages/Home.jsx';
import SignIn from '@/pages/auth/SignIn.jsx';
import SignUp from '@/pages/auth/SignUp.jsx';
import Dashboard from '@/pages/dashboard/Dashboard.jsx';
import ListBooks from '@/pages/dashboard/books/ListBooks';
import ListUsers from '@/pages/dashboard/users/ListUsers';
import NotFound from '@/pages/NotFound';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<LandingLayout />}>
					<Route index element={<Home />} />
				</Route>

				<Route path='auth' element={<AuthLayout />}>
					<Route path='signin' element={<SignIn />} />
					<Route path='signup' element={<SignUp />} />
				</Route>

				<Route path='dashboard' element={<DashboardLayout />}>
					<Route index element={<Dashboard />} />
					<Route path='books' element={<ListBooks />} />
					<Route path='users' element={<ListUsers />} />
				</Route>

				<Route path='admin' element={<AdminLayout />}></Route>

				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
