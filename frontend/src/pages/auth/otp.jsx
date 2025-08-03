import * as React from 'react';
import * as z from 'zod';

import { toast } from 'sonner';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/hooks/use-auth';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { OTPInput } from '@/components/ui/otp-input';

const OneTimePasswordSchema = z.object({
	otp: z
		.string()
		.length(6)
		.regex(/^\d{6}$/),
});

const OneTimePassword = () => {
	const { loading, session, validate, signout } = useAuth();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!loading && !session) navigate('/auth/signin');
	}, [session, loading, navigate]);

	const {
		control,
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
			await validate(data);
			toast('One time password verified', {
				description: 'You are now logged in',
			});
			navigate('/dashboard');
		} catch (error) {
			toast.error('Failed to login', {
				description: error.response.data.message || error.message,
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
				description: error.response.data.message || error.message,
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
					<Label htmlFor='otp'>Input code</Label>
					<Controller
						control={control}
						name='otp'
						render={({ field }) => (
							<OTPInput
								autoFocus
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
					{errors.otp && (
						<span className='text-red-500'>{errors.otp.message}</span>
					)}
				</div>

				<Button>Login</Button>

				<div className='text-sm text-center text-zinc-500 '>
					Didn&apos;t receive the code?{' '}
					<button
						type='button'
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
