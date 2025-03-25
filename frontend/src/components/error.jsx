import * as React from 'react';
import { TriangleAlert } from 'lucide-react';

const Error = ({ error, loading = false }) => {
	if (loading || !error) return null;

	return (
		<div className='flex flex-col items-center justify-center w-full gap-2 text-center h-60 rounded-2xl'>
			<div className='flex items-center gap-2'>
				<TriangleAlert className='text-red-500 size-6 animate-pulse' />
				<span className='font-medium'>Error to load data</span>
			</div>
			{error.message && <p className='text-zinc-600'>{error.message}</p>}
		</div>
	);
};

export default Error;
