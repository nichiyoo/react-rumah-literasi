import * as React from 'react';
import { toast } from 'sonner';
import { STEPS, useTransactionStore } from '@/store/use-transactions';

import axios from '@/libs/axios';
import { cn, currency } from '@/libs/utils';

import { Loading } from '@/components/loading';
import { Button } from '@/components/ui/button';
import CustomerDetail from '@/components/transactions/customer-detail';
import { useAsync } from '@/hooks/use-async';
import { Error } from '@/components/error';

const StepCourier = ({ onSubmit }) => {
	const { recipient, books, route, setCourier } = useTransactionStore();
	const { data, error, loading, mutate } = useAsync(
		() => {
			return axios.post('/deliveries/couriers', {
				recipient,
				books,
			});
		},
		[recipient, books],
		{
			initial: [],
			onSuccess: ({ data }) => {
				const { destination, pricings } = data.data;

				return pricings.map((courier) => ({
					...courier,
					zipcode: destination.postal_code,
					selected: false,
				}));
			},
			onError: (error) => {
				toast.error('Failed to fetch couriers', {
					description: error.response.data.message || error.message,
				});
			},
		}
	);

	const handleSelect = (courier) => {
		mutate((prev) => {
			return prev.map((item) => ({
				...item,
				selected: item.id === courier.id,
			}));
		});

		setCourier({
			zipcode: courier.zipcode,
			courier_company: courier.courier_code,
			courier_type: courier.courier_service_code,
		});
	};

	return (
		<div>
			<div className='relative grid items-start gap-6 xl:grid-cols-3'>
				<div className='grid gap-6'>
					<CustomerDetail />

					<div className='flex items-center gap-2'>
						<Button variant='outline' onClick={() => route(STEPS.RECIPIENT)}>
							Back
						</Button>
						<Button onClick={onSubmit}>Finish</Button>
					</div>
				</div>

				<div className='grid gap-6 md:grid-cols-2 xl:col-span-2'>
					<Error error={!loading && error} />
					<Loading loading={loading} />
					{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

					{data.map((courier) => (
						<div
							key={courier.id}
							onClick={() => handleSelect(courier)}
							className={cn(
								'border border-zinc-200 rounded-2xl cursor-pointer',
								{ 'border-primary-500': courier.selected }
							)}>
							<div className='flex items-center justify-between p-4 font-semibold '>
								<h3>{courier.courier_name}</h3>
								<h4 className='text-primary-500'>
									{courier.courier_service_name}
								</h4>
							</div>
							<div className='flex flex-col p-4 border-t text-zinc-600 border-zinc-200'>
								<div className='flex text-nowrap'>
									<span>Estimasi Durasi</span>
									<div className='w-full mb-1 border-b border-dotted'></div>
									<span>{courier.duration}</span>
								</div>
								<div className='flex text-nowrap'>
									<span>Harga</span>
									<div className='w-full mb-1 border-b border-dotted'></div>
									<span className='font-medium text-black'>
										{currency(courier.price)}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default StepCourier;
