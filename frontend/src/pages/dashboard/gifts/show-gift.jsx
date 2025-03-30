import * as React from 'react';
import useSWR from 'swr';
import { Link, useParams } from 'react-router';

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
import { Map } from '@/components/map';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

const EditGift = () => {
	const { id } = useParams();
	const { user, loading: userLoading } = useAuth();
	const { error, data: result, isLoading: loading } = useSWR('/gifts/' + id);

	const admin = !userLoading && user.role === 'admin';

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Detail Gift</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<Error error={!loading && error} />
			<Loading loading={loading} />

			{result && (
				<div className='grid gap-6 lg:grid-cols-2'>
					<div className='col-span-full'>
						<Label htmlFor='title'>Title</Label>
						<Input disabled type='text' defaultValue={result.data.title} />
					</div>

					<div>
						<Label htmlFor='genre'>Genre</Label>
						<Input disabled type='text' defaultValue={result.data.genre} />
					</div>

					<div>
						<Label htmlFor='amount'>Amount</Label>
						<Input disabled type='number' defaultValue={result.data.amount} />
					</div>

					<div className='col-span-full'>
						<Label htmlFor='address'>Address</Label>
						<Textarea disabled defaultValue={result.data.address} />
					</div>

					<div className='col-span-full'>
						<Label htmlFor='location'>Location</Label>
						<Map
							location={{
								latitude: result.data.latitude,
								longitude: result.data.longitude,
							}}
							className='aspect-banner'
						/>
					</div>

					<div>
						<Label htmlFor='status'>Status</Label>
						<Input type='text' defaultValue={result.data.status} />
					</div>

					<div className='col-span-full'>
						<div className='flex items-center gap-2'>
							<Link to='/dashboard/gifts'>
								<Button variant='outline'>Back</Button>
							</Link>

							{admin && (
								<Link to={'../edit'} relative='path'>
									<Button>Edit</Button>
								</Link>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EditGift;
