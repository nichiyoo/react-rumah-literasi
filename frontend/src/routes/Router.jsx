import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import LazyRoute from '@/routes/lazy';
import AuthLayout from '@/layouts/auth-layout';
import AuthorizeLayout from '@/layouts/authorize-layout';
import LandingLayout from '@/layouts/landing-layout';
import DashboardLayout from '@/layouts/dashboard-layout';

import Home from '@/pages/home';
import About from '@/pages/about';
import Contact from '@/pages/contact';
import SignIn from '@/pages/auth/sign-in';
import SignUp from '@/pages/auth/sign-up';
import Setting from '@/pages/setting/setting';
import OneTimePassword from '@/pages/auth/otp';
import ProfileDetail from '@/pages/setting/profile';
import ForgotPassword from '@/pages/auth/forgot-password';
import ResetPassword from '@/pages/auth/reset-password';

import NotFound from '@/pages/errors/not-found';
import ExpiredLink from '@/pages/errors/expired-link';
import Unauhtorized from '@/pages/errors/unauthorized';

import { ROLES } from '@/libs/constant';

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

					<Route path='members' element={<AuthorizeLayout />}>
						<Route index element={<ListUsers />} />
						<Route path='create' element={<AddUser />} />
						<Route path=':uuid/edit' element={<EditUser />} />
					</Route>

					<Route
						path='books'
						element={<AuthorizeLayout roles={[ROLES.LIBRARIAN]} />}>
						<Route index element={<ListBooks />} />
						<Route path='create' element={<AddBook />} />
						<Route path=':id/edit' element={<EditBook />} />
					</Route>

					<Route
						path='events'
						element={<AuthorizeLayout roles={[ROLES.ADMIN]} />}>
						<Route index element={<ListEvents />} />
						<Route path='create' element={<AddEvent />} />
						<Route path=':id/edit' element={<EditEvent />} />
					</Route>

					<Route
						path='donations'
						element={<AuthorizeLayout roles={[ROLES.GUEST, ROLES.ADMIN]} />}>
						<Route index element={<ListDonations />} />
						<Route path='create' element={<AddDonation />} />
						<Route path=':id/detail' element={<ShowDonation />} />
					</Route>

					<Route
						path='donations'
						element={<AuthorizeLayout roles={[ROLES.ADMIN]} />}>
						<Route path=':id/edit' element={<EditDonation />} />
					</Route>

					<Route
						path='gifts'
						element={<AuthorizeLayout roles={[ROLES.GUEST, ROLES.ADMIN]} />}>
						<Route index element={<ListGifts />} />
						<Route path='create' element={<AddGift />} />
						<Route path=':id/detail' element={<ShowGift />} />
					</Route>

					<Route
						path='gifts'
						element={<AuthorizeLayout roles={[ROLES.ADMIN]} />}>
						<Route path=':id/edit' element={<EditGift />} />
					</Route>

					<Route
						path='transactions'
						element={
							<AuthorizeLayout roles={[ROLES.GUEST, ROLES.LIBRARIAN]} />
						}>
						<Route index element={<ListTransactions />} />
						<Route path='create' element={<AddTransaction />} />
						<Route path=':uuid/detail' element={<ShowTransaction />} />
						<Route path=':uuid/track' element={<TrackTransaction />} />
					</Route>

					<Route path='profile' element={<ProfileDetail />} />
					<Route path='settings' element={<Setting />} />
				</Route>

				<Route path='expired' element={<ExpiredLink />} />
				<Route path='unauthorized' element={<Unauhtorized />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
