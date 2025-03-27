import * as React from 'react';
import { STEPS, useTransactionStore } from '@/store/use-transactions';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import StepBook from '@/components/transactions/steps/step-book';
import StepRecipient from '@/components/transactions/steps/step-recipient';
import StepDelivery from '@/components/transactions/steps/step-delivery';

const CreateTransaction = () => {
	const { step } = useTransactionStore();

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
			{step === STEPS.DELIVERY && <StepDelivery />}
		</div>
	);
};

export default CreateTransaction;
