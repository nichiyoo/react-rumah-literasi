import * as React from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import {
	Checkbox,
	CheckboxGroup,
	CheckboxLabel,
} from '@/components/ui/Checkbox';

const SignIn = () => {
	return (
		<div>
			<h1 className='mb-8 text-4xl font-bold text-primary-500'>Login</h1>

			<form className='grid gap-6'>
				<div>
					<Label>Email</Label>
					<Input type='email' placeholder='Enter your email' />
				</div>

				<div>
					<Label>Password</Label>
					<Input type='password' placeholder='Enter your password' />
				</div>

				<div className='flex items-center justify-between'>
					<CheckboxGroup>
						<Checkbox id='remember-me' name='remember-me' type='checkbox' />
						<CheckboxLabel for='remember-me'>Remember me</CheckboxLabel>
					</CheckboxGroup>

					<Link
						to='/auth/forgot-password'
						className='text-sm font-medium text-primary-600 hover:text-primary-500'>
						Forgot your password?
					</Link>
				</div>

				<Button className='w-full'>Login</Button>

				<div className='text-sm text-center text-gray-500 '>
					Don't have an account?{' '}
					<Link
						to='/auth/signup'
						className='font-medium text-primary-600 hover:text-primary-500'>
						Sign up
					</Link>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
