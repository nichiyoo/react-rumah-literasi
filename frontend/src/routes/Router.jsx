import { BrowserRouter, Route, Routes } from 'react-router';

import AuthLayout from '@/layouts/auth-layout.jsx';
import AdminLayout from '@/layouts/admin-layout.jsx';
import LandingLayout from '@/layouts/landing-layout.jsx';
import DashboardLayout from '@/layouts/dashboard-layout.jsx';

import Home from '@/pages/home.jsx';
import NotFound from '@/pages/not-found.jsx';
import SignIn from '@/pages/auth/sign-in.jsx';
import SignUp from '@/pages/auth/sign-up.jsx';
import Dashboard from '@/pages/dashboard/dashboard.jsx';

import ListBooks from '@/pages/dashboard/books/list-books';
import ListUsers from '@/pages/dashboard/users/list-users';
import ListEvents from '@/pages/dashboard/events/list-events';
import ListGifts from '@/pages/dashboard/gifts/list-gifts';
import ListDonations from '@/pages/dashboard/donations/list-donations';

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
					<Route path='events' element={<ListEvents />} />
					<Route path='gifts' element={<ListGifts />} />
					<Route path='donations' element={<ListDonations />} />
				</Route>

				<Route path='admin' element={<AdminLayout />}></Route>

				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
