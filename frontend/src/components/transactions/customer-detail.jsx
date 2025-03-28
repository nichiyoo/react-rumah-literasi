import * as React from 'react';

import { cn } from '@/libs/utils';
import { useTransactionStore } from '@/store/use-transactions';

const CustomerDetail = ({ className }) => {
	const { recipient } = useTransactionStore();

	const details = [
		{
			label: 'Name',
			value: recipient.name,
		},
		{
			label: 'Phone',
			value: recipient.phone,
		},
		{
			label: 'Address',
			value: recipient.address,
		},
		{
			label: 'Borrowed Date',
			value: recipient.borrowed_date,
		},
		{
			muted: true,
			label: 'Notes',
			value: recipient.note,
		},
	];

	return (
		<div>
			<div
				className={cn(
					'flex items-center justify-between p-4 font-semibold border rounded-t-2xl border-zinc-200',
					className
				)}>
				<h3 className='text-lg font-semibold'>Recipient</h3>
			</div>

			<div className='flex flex-col gap-4 p-4 border border-t-0 text-zinc-600 rounded-b-2xl border-zinc-200'>
				{details.map((detail) => (
					<dd key={detail.label} className='text-sm font-medium'>
						<dt className='text-black'>{detail.label}</dt>
						<dt
							className={cn('text-primary-500', {
								'text-zinc-500': detail.muted,
							})}>
							{detail.value}
						</dt>
					</dd>
				))}
			</div>
		</div>
	);
};

export default CustomerDetail;
