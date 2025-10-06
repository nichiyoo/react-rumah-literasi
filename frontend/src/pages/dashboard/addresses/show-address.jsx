import * as React from 'react';
import { toast } from 'sonner';
import useSWR, { useSWRConfig } from 'swr';
import { Link, useParams } from 'react-router';
import { useConfirm } from '@/hooks/use-confirm';

import axios from '@/libs/axios';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Map } from '@/components/map';
import { Badge } from '@/components/ui/badge';

const ShowAddress = () => {
	const { id } = useParams();
	const { confirm } = useConfirm();
	const { mutate } = useSWRConfig();

	const {
		error,
		data: result,
		isLoading: fetching,
	} = useSWR('/addresses/' + id);

	const handleDefault = async (id) => {
		confirm({
			title: 'Confirm Action',
			description: 'Are you sure you want to set this address as default?',
		})
			.then(async () => {
				try {
					await axios.patch('/addresses/' + id + '/default');

					mutate('/addresses');
					mutate('/addresses/' + id);
					toast('Address set as default', {
						description: 'Successfully set address as default',
					});
				} catch (error) {
					toast.error('Failed to set address as default', {
						description: error.response.data.message || error.message,
					});
					console.log(error);
				}
			})
			.catch(() => {
				// pass
			});
	};

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle className='flex items-center justify-between'>
					<span>Address Details</span>
					{result && result.data.is_default && <Badge>default</Badge>}
				</HeadingTitle>
				<HeadingDescription>
					View and manage your address details.
				</HeadingDescription>
			</Heading>

			<Error error={!fetching && error} />
			<Loading loading={fetching} />

			{result && (
				<div className='grid gap-6 lg:grid-cols-2'>
					<div>
						<Label htmlFor='name'>Address Name</Label>
						<Input disabled type='text' defaultValue={result.data.name} />
					</div>

					<div className='col-span-full'>
						<Label htmlFor='street_address'>Street Address</Label>
						<Textarea disabled defaultValue={result.data.street_address} />
					</div>

					<div>
						<Label htmlFor='province'>Province</Label>
						<Input
							disabled
							type='text'
							defaultValue={result.data.province.name}
						/>
					</div>

					<div>
						<Label htmlFor='city'>City</Label>
						<Input disabled type='text' defaultValue={result.data.city.name} />
					</div>

					<div>
						<Label htmlFor='district'>District</Label>
						<Input
							disabled
							type='text'
							defaultValue={result.data.district.name}
						/>
					</div>

					<div>
						<Label htmlFor='zipcode'>Zipcode</Label>
						<Input disabled type='text' defaultValue={result.data.zipcode} />
					</div>

					<div className='col-span-full'>
						<Label htmlFor='note'>Note</Label>
						<Textarea
							disabled
							defaultValue={result.data.note || 'No note added'}
						/>
					</div>

					<div className='col-span-full'>
						<Label htmlFor='location'>Location on Map</Label>
						<div className='mt-2'>
							<Map
								location={{
									latitude: result.data.latitude || 0,
									longitude: result.data.longitude || 0,
								}}
								className='w-full aspect-video'
								readonly
							/>
						</div>
					</div>

					<div className='col-span-full'>
						<div className='flex items-center gap-2'>
							<Link to='/dashboard/addresses'>
								<Button variant='outline'>Back</Button>
							</Link>
							{!result.data.is_default && (
								<Button
									variant='outline'
									onClick={() => {
										if (result.data.is_default) return;
										handleDefault(result.data.id);
									}}>
									Set as Default
								</Button>
							)}
							<Link to={'../edit'} relative='path'>
								<Button>Edit</Button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShowAddress;
