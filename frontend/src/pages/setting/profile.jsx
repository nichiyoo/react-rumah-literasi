import * as React from 'react';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import { useAuth } from '@/hooks/use-auth';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const ProfileDetail = () => {
	const { user, loading } = useAuth();

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Member Profile</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			{loading && (
				<div className='w-full h-96 rounded-xl bg-zinc-100'>
					<span>Loading...</span>
				</div>
			)}

			{user && (
				<div className='grid grid-cols-2 gap-6'>
					<div className='col-span-full'>
						<Label htmlFor='name'>Name</Label>
						<Input type='text' value={user.name} disabled />
					</div>

					<div className='col-span-full'>
						<Label htmlFor='email'>Email</Label>
						<Input type='email' value={user.email} disabled />
					</div>

					<div>
						<Label htmlFor='password'>Role</Label>
						<Input type='text' value={user.role} disabled />
					</div>

					<div>
						<Label htmlFor='is_verified'>Verified</Label>
						<Input
							type='text'
							value={user.is_verified ? 'Yes' : 'No'}
							disabled
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileDetail;
