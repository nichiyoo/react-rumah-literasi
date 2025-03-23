import * as React from 'react';

import useSWR from 'swr';
import { Link } from 'react-router';
import { fetcher } from '@/libs/axios';

import { Avatar } from '@/components/ui/avatar';

const Profile = () => {
	const { data: result, isLoading: loading } = useSWR('/auth/profile', fetcher);

	return (
		<Link to='/dashboard/profile' className='flex items-center gap-2'>
			{loading && (
				<React.Fragment>
					<div class='size-10 bg-zinc-100 rounded-full animate-pulse' />
					<div className='flex-col flex-none hidden gap-1 lg:flex'>
						<div className='w-32 h-5 rounded-md bg-zinc-100 animate-pulse' />
						<div className='w-40 h-5 rounded-md bg-zinc-100 animate-pulse' />
					</div>
				</React.Fragment>
			)}

			{result && (
				<React.Fragment>
					<Avatar name={result.data.name} />
					<div className='flex-col flex-none hidden gap-1 text-sm leading-none lg:flex'>
						<span className='font-medium'>{result.data.name}</span>
						<span className='text-zinc-500'>{result.data.email}</span>
					</div>
				</React.Fragment>
			)}
		</Link>
	);
};

export default Profile;
