import * as React from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';

const SignUp = () => {
	return (
		<div>
			<h1 className='mb-8 text-4xl font-bold text-primary-500'>Register</h1>

			<form className='grid gap-6'>
				<div>
					<Label> Name</Label>
					<Input type='text' placeholder='Enter your name' />
				</div>

				<div>
					<Label> Email</Label>
					<Input type='email' placeholder='Enter your email' />
				</div>

				<div>
					<Label> Password</Label>
					<Input type='password' placeholder='Enter your password' />
				</div>

				<Button className='w-full'>Register</Button>

				<div className='text-sm text-center text-gray-500 '>
					Already have an account?{' '}
					<Link
						to='/auth/signin'
						className='font-medium text-primary-600 hover:text-primary-500'>
						Sign In
					</Link>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
