import * as React from 'react';
import * as z from 'zod';

import { toast } from 'sonner';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/hooks/use-auth';
import { isAxiosError } from '@/libs/axios';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const OneTimePasswordSchema = z.object({
	otp: z.coerce.number().int().positive().min(6),
});

const OneTimePassword = () => {
	const { loading, session, verify, signout } = useAuth();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!loading && !session) navigate('/auth/signin');
	}, [session, loading, navigate]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(OneTimePasswordSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = handleSubmit(async (data) => {
		try {
			await verify(data);
			toast('One time password verified', {
				description: 'You are now logged in',
			});
			navigate('/dashboard');
		} catch (error) {
			toast.error('Failed to login', {
				description: isAxiosError(error)
					? error.response?.data?.message
					: error.message,
			});
			console.error(error);
		}
	});

	const handleLogout = async () => {
		try {
			await signout();
			navigate('/auth/signin');
		} catch (error) {
			toast.error('Failed to logout', {
				description: isAxiosError(error)
					? error.response?.data?.message
					: error.message,
			});
		}
	};

	return (
		<div>
			<h1 className='mb-8 text-4xl font-bold text-primary-500'>
				One Time Password
			</h1>

			<form className='grid gap-6' onSubmit={onSubmit}>
				<div>
					<Label htmlFor='otp'>One Time Password</Label>
					<Input type='otp' placeholder='Enter your otp' {...register('otp')} />
					{errors.otp && (
						<span className='text-red-500'>{errors.otp.message}</span>
					)}
				</div>

				<Button>Login</Button>

				<div className='text-sm text-center text-zinc-500 '>
					Didn&apos;t receive the code?{' '}
					<button
						onClick={handleLogout}
						className='font-medium text-primary-600 hover:text-primary-500'>
						Change Account
					</button>
				</div>
			</form>
		</div>
	);
};

export default OneTimePassword;
