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
import CreateBook from '@/pages/dashboard/books/create-book';
import EditBook from '@/pages/dashboard/books/edit-book';
import CreateEvent from '@/pages/dashboard/events/create-event';
import EditEvent from '@/pages/dashboard/events/edit-event';
import CreateUser from '@/pages/dashboard/users/create-user';
import EditUser from '@/pages/dashboard/users/edit-user';
import ProfileDetail from '@/pages/setting/profile';

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

					<Route path='books'>
						<Route index element={<ListBooks />} />
						<Route path='create' element={<CreateBook />} />
						<Route path=':id' element={<EditBook />} />
					</Route>

					<Route path='events'>
						<Route index element={<ListEvents />} />
						<Route path='create' element={<CreateEvent />} />
						<Route path=':id' element={<EditEvent />} />
					</Route>

					<Route path='users'>
						<Route index element={<ListUsers />} />
						<Route path='create' element={<CreateUser />} />
						<Route path=':id' element={<EditUser />} />
					</Route>

					<Route path='gifts' element={<ListGifts />} />
					<Route path='donations' element={<ListDonations />} />

					<Route path='profile' element={<ProfileDetail />} />
				</Route>

				<Route path='admin' element={<AdminLayout />}></Route>

				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
