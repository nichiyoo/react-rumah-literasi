import * as React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = ({ loading = true }) => {
	if (!loading) return null;

	return (
		<div className='flex items-center justify-center w-full h-60 bg-zinc-50'>
			<div className='flex items-center gap-2'>
				<Loader2 className='text-primary-500 size-6 animate-spin' />
				<span className='font-medium'>Loading...</span>
			</div>
		</div>
	);
};

export default Loading;
