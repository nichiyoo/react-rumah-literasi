import * as React from 'react';

import useSWR from 'swr';
import { Link } from 'react-router';
import { fetcher } from '@/libs/axios';

const Avatar = () => {
	const { data: result, isLoading: loading } = useSWR('/auth/profile', fetcher);

	return (
		<Link to='/dashboard/profile' className='flex items-center gap-2'>
			{loading && (
				<div className='flex flex-col gap-1'>
					<div className='w-32 h-5 rounded-md bg-zinc-100 animate-pulse' />
					<div className='w-40 h-5 rounded-md bg-zinc-100 animate-pulse' />
				</div>
			)}

			{result && (
				<React.Fragment>
					<img
						alt={result.data.name}
						className='flex-none border rounded-full size-10 border-zinc-200'
						src={
							'https://ui-avatars.com/api/?bold=true&font-size=0.33&format=svg&background=f4f4f5&name=' +
							result.data.name
						}
					/>
					<div className='flex flex-col gap-1 text-sm leading-none'>
						<span className='font-medium'>{result.data.name}</span>
						<span className='text-zinc-500'>{result.data.email}</span>
					</div>
				</React.Fragment>
			)}
		</Link>
	);
};

export default Avatar;
