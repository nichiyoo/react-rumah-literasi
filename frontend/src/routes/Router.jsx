import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import AuthLayout from '@/layouts/auth-layout.jsx';
import AdminLayout from '@/layouts/admin-layout.jsx';
import LandingLayout from '@/layouts/landing-layout.jsx';
import DashboardLayout from '@/layouts/dashboard-layout.jsx';

import Home from '@/pages/home.jsx';
import About from '@/pages/about';
import Contact from '@/pages/contact';
import NotFound from '@/pages/not-found.jsx';
import SignIn from '@/pages/auth/sign-in.jsx';
import SignUp from '@/pages/auth/sign-up.jsx';
import Dashboard from '@/pages/dashboard/dashboard.jsx';

import ListBooks from '@/pages/dashboard/books/list-books';
import ListUsers from '@/pages/dashboard/members/list-member';
import ListEvents from '@/pages/dashboard/events/list-events';
import ListGifts from '@/pages/dashboard/gifts/list-gifts';
import ListDonations from '@/pages/dashboard/donations/list-donations';
import CreateBook from '@/pages/dashboard/books/create-book';
import EditBook from '@/pages/dashboard/books/edit-book';
import CreateEvent from '@/pages/dashboard/events/create-event';
import EditEvent from '@/pages/dashboard/events/edit-event';
import CreateUser from '@/pages/dashboard/members/create-member';
import EditUser from '@/pages/dashboard/members/edit-member';
import ProfileDetail from '@/pages/setting/profile';
import OneTimePassword from '@/pages/auth/otp';
import CreateDonation from '@/pages/dashboard/donations/create-donation';
import EditDonation from '@/pages/dashboard/donations/edit-donation';
import CreateGift from '@/pages/dashboard/gifts/create-gift';
import EditGift from '@/pages/dashboard/gifts/edit-gift';
import ListTransactions from '@/pages/dashboard/transactions/list-transactions';
import CreateTransaction from '@/pages/dashboard/transactions/create-transaction';
import EditTransaction from '@/pages/dashboard/transactions/edit-transaction';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<LandingLayout />}>
					<Route index element={<Home />} />
					<Route path='about' element={<About />} />
					<Route path='contact' element={<Contact />} />
				</Route>

				<Route path='auth' element={<AuthLayout />}>
					<Route index element={<Navigate to='/auth/signin' />} />
					<Route path='signin' element={<SignIn />} />
					<Route path='signup' element={<SignUp />} />
					<Route path='otp' element={<OneTimePassword />} />
				</Route>

				<Route path='dashboard' element={<DashboardLayout />}>
					<Route index element={<Dashboard />} />

					<Route path='books' element={<AdminLayout />}>
						<Route index element={<ListBooks />} />
						<Route path='create' element={<CreateBook />} />
						<Route path=':id' element={<EditBook />} />
					</Route>

					<Route path='events' element={<AdminLayout />}>
						<Route index element={<ListEvents />} />
						<Route path='create' element={<CreateEvent />} />
						<Route path=':id' element={<EditEvent />} />
					</Route>

					<Route path='members' element={<AdminLayout />}>
						<Route index element={<ListUsers />} />
						<Route path='create' element={<CreateUser />} />
						<Route path=':id' element={<EditUser />} />
					</Route>

					<Route path='donations'>
						<Route index element={<ListDonations />} />
						<Route path='create' element={<CreateDonation />} />
						<Route path=':id' element={<EditDonation />} />
					</Route>

					<Route path='gifts'>
						<Route index element={<ListGifts />} />
						<Route path='create' element={<CreateGift />} />
						<Route path=':id' element={<EditGift />} />
					</Route>

					<Route path='transactions'>
						<Route index element={<ListTransactions />} />
						<Route path='create' element={<CreateTransaction />} />
						<Route path=':id' element={<EditTransaction />} />
					</Route>

					<Route path='profile' element={<ProfileDetail />} />
				</Route>

				<Route path='admin' element={<AdminLayout />}></Route>

				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
