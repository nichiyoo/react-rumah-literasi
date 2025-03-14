import useSWR from 'swr';
import { Link } from 'react-router';
import { fetcher } from '@/libs/axios';

const Avatar = () => {
	const { data: result, isLoading: loading } = useSWR('/auth/profile', fetcher);

	return (
		<Link to='/dashboard/profile' className='flex items-center gap-2'>
			<div className='flex-none rounded-full bg-zinc-100 size-10' />

			{loading && (
				<div className='flex flex-col gap-1'>
					<div className='w-32 h-5 rounded-md bg-zinc-100 animate-pulse' />
					<div className='w-40 h-5 rounded-md bg-zinc-100 animate-pulse' />
				</div>
			)}

			{result && (
				<div className='flex flex-col'>
					<span className='text-sm font-medium'>{result.data.name}</span>
					<span className='text-xs text-zinc-500'>{result.data.email}</span>
				</div>
			)}
		</Link>
	);
};

export default Avatar;
