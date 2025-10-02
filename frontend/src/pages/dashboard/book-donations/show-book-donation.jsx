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
import { ROLES } from '@/libs/constant';

const ShowBookDonation = () => {
	const { id } = useParams();
	const { user, loading } = useAuth();
	const {
		error,
		data: result,
		isLoading: fetching,
	} = useSWR('/book-donations/' + id);

	const allowed = React.useMemo(() => {
		if (loading) return false;
		return [ROLES.ADMIN, ROLES.SUPERADMIN].includes(user.role);
	}, [user, loading]);

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Detail Book Donation</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<Error error={!fetching && error} />
			<Loading loading={fetching} />

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

					<div>
						<Label htmlFor='province'>Province</Label>
						<Input
							disabled
							type='text'
							defaultValue={result.data.province?.name}
						/>
					</div>

					<div>
						<Label htmlFor='city'>City</Label>
						<Input disabled type='text' defaultValue={result.data.city?.name} />
					</div>

					<div>
						<Label htmlFor='district'>District</Label>
						<Input
							disabled
							type='text'
							defaultValue={result.data.district?.name}
						/>
					</div>

					<div>
						<Label htmlFor='zipcode'>Zipcode</Label>
						<Input disabled type='text' defaultValue={result.data.zipcode} />
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
						<Input disabled type='text' defaultValue={result.data.status} />
					</div>

					<div className='col-span-full'>
						<div className='flex items-center gap-2'>
							<Link to='/dashboard/book-donations'>
								<Button variant='outline'>Back</Button>
							</Link>

							{allowed && (
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

export default ShowBookDonation;
