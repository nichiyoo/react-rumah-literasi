import * as React from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

const NotFound = () => {
	return (
		<div className='relative w-full h-screen'>
			<Link to='/' className='absolute top-0 left-0 m-6'>
				<Logo />
			</Link>

			<div className='flex flex-col items-center justify-center h-full gap-4 text-center'>
				<h1 className='font-bold text-8xl text-primary-500'>404</h1>
				<p className='w-full max-w-2xl mx-auto'>
					The page you are looking for does not exist or has been moved,
					updated, or deleted. Please check the URL and try again. If you think
					this is an error, please contact the website administrator.
				</p>
				<Link to='/'>
					<Button>Back to Home Page</Button>
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
