import * as React from 'react';
import { STEPS, useTransactionStore } from '@/store/use-transactions';

import { Button } from '@/components/ui/button';

const StepDelivery = () => {
	const { advance } = useTransactionStore();

	return (
		<div>
			<h2 className='mb-6 text-xl font-medium'>Step Delivery</h2>
			<div className='flex items-center gap-2'>
				<Button onClick={() => advance(STEPS.BOOKS)}>Finish</Button>
				<Button onClick={() => advance(STEPS.RECIPIENT)}>Back</Button>
			</div>
		</div>
	);
};

export default StepDelivery;
