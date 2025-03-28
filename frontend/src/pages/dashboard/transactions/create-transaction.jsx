import * as React from 'react';
import { toast } from 'sonner';
import { useSWRConfig } from 'swr';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router';

import axios from '@/libs/axios';
import { STEPS, useTransactionStore } from '@/store/use-transactions';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import StepBook from '@/components/transactions/steps/step-book';
import StepRecipient from '@/components/transactions/steps/step-recipient';
import StepCourier from '@/components/transactions/steps/step-courier';

const CreateTransaction = () => {
	const navigate = useNavigate();
	const { mutate } = useSWRConfig();
	const { step, validate, reset } = useTransactionStore();

	const onSubmit = async () => {
		try {
			const result = await validate();

			if (!result.success) {
				toast.error('Failed to create transaction', {
					description: result.error.message,
				});
				return;
			}

			toast('Creating transaction', {
				description: 'Creating transaction...',
			});

			await axios.post('/transactions', result.data);

			toast('Transaction created', {
				description: 'Successfully created transaction',
			});

			reset();
			mutate('/transactions');
			navigate('/dashboard/transactions');

			const duration = 5 * 1000;
			const end = Date.now() + duration;
			const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

			const range = (min, max) => Math.random() * (max - min) + min;

			const interval = window.setInterval(() => {
				const remaining = end - Date.now();

				if (remaining <= 0) return clearInterval(interval);
				const count = 50 * (remaining / duration);

				confetti({
					...defaults,
					particleCount: count,
					origin: { x: range(0.1, 0.3), y: Math.random() - 0.2 },
				});

				confetti({
					...defaults,
					particleCount: count,
					origin: { x: range(0.7, 0.9), y: Math.random() - 0.2 },
				});
			}, 250);
		} catch (error) {
			toast.error('Failed to create transaction', {
				description: error.response.data.message || error.message,
			});
			console.error(error);
		}
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Create Transaction</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			{step === STEPS.BOOKS && <StepBook />}
			{step === STEPS.RECIPIENT && <StepRecipient />}
			{step === STEPS.COURIER && <StepCourier onSubmit={onSubmit} />}
		</div>
	);
};

export default CreateTransaction;
