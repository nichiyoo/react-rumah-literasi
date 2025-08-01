import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import LazyRoute from '@/routes/lazy';
import AuthLayout from '@/layouts/auth-layout';
import AdminLayout from '@/layouts/admin-layout';
import LandingLayout from '@/layouts/landing-layout';
import DashboardLayout from '@/layouts/dashboard-layout';

import Home from '@/pages/home';
import About from '@/pages/about';
import Contact from '@/pages/contact';
import NotFound from '@/pages/not-found';
import SignIn from '@/pages/auth/sign-in';
import SignUp from '@/pages/auth/sign-up';
import OneTimePassword from '@/pages/auth/otp';
import ProfileDetail from '@/pages/setting/profile';
import Setting from '@/pages/setting/setting';
import ForgotPassword from '@/pages/auth/forgot-password';
import ResetPassword from '@/pages/auth/reset-password';
import ExpiredLink from '@/pages/expired-link';

const load = (callback) => {
	const Component = React.lazy(callback);
	return (props) => <LazyRoute component={Component} {...props} />;
};

const Dashboard = load(() => import('~/dashboard'));

const ListBooks = load(() => import('~/books/list-books'));
const AddBook = load(() => import('~/books/create-book'));
const EditBook = load(() => import('~/books/edit-book'));

const ListGifts = load(() => import('~/gifts/list-gifts'));
const AddGift = load(() => import('~/gifts/create-gift'));
const EditGift = load(() => import('~/gifts/edit-gift'));
const ShowGift = load(() => import('~/gifts/show-gift'));

const ListEvents = load(() => import('~/events/list-events'));
const AddEvent = load(() => import('~/events/create-event'));
const EditEvent = load(() => import('~/events/edit-event'));

const ListDonations = load(() => import('~/donations/list-donations'));
const AddDonation = load(() => import('~/donations/create-donation'));
const EditDonation = load(() => import('~/donations/edit-donation'));
const ShowDonation = load(() => import('~/donations/show-donation'));

const ListUsers = load(() => import('~/members/list-member'));
const AddUser = load(() => import('~/members/create-member'));
const EditUser = load(() => import('~/members/edit-member'));

const ListTransactions = load(() => import('~/transactions/list-transactions'));
const AddTransaction = load(() => import('~/transactions/create-transaction'));
const ShowTransaction = load(() => import('~/transactions/show-transaction'));
const TrackTransaction = load(() => import('~/transactions/track-transaction'));

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
					<Route path='forgot-password' element={<ForgotPassword />} />
					<Route path='reset-password' element={<ResetPassword />} />
				</Route>

				<Route path='dashboard' element={<DashboardLayout />}>
					<Route index element={<Dashboard />} />

					<Route path='books' element={<AdminLayout />}>
						<Route index element={<ListBooks />} />
						<Route path='create' element={<AddBook />} />
						<Route path=':id/edit' element={<EditBook />} />
					</Route>

					<Route path='events' element={<AdminLayout />}>
						<Route index element={<ListEvents />} />
						<Route path='create' element={<AddEvent />} />
						<Route path=':id/edit' element={<EditEvent />} />
					</Route>

					<Route path='members' element={<AdminLayout />}>
						<Route index element={<ListUsers />} />
						<Route path='create' element={<AddUser />} />
						<Route path=':id/edit' element={<EditUser />} />
					</Route>

					<Route path='donations'>
						<Route index element={<ListDonations />} />
						<Route path='create' element={<AddDonation />} />
						<Route path=':id/detail' element={<ShowDonation />} />
						<Route path=':id/edit' element={<AdminLayout />}>
							<Route index element={<EditDonation />} />
						</Route>
					</Route>

					<Route path='gifts'>
						<Route index element={<ListGifts />} />
						<Route path='create' element={<AddGift />} />
						<Route path=':id/detail' element={<ShowGift />} />
						<Route path=':id/edit' element={<AdminLayout />}>
							<Route index element={<EditGift />} />
						</Route>
					</Route>

					<Route path='transactions'>
						<Route index element={<ListTransactions />} />
						<Route path='create' element={<AddTransaction />} />
						<Route path=':uuid/detail' element={<ShowTransaction />} />
						<Route path=':uuid/track' element={<TrackTransaction />} />
					</Route>

					<Route path='profile' element={<ProfileDetail />} />
					<Route path='settings' element={<Setting />} />
				</Route>

				<Route path='expired' element={<ExpiredLink />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
