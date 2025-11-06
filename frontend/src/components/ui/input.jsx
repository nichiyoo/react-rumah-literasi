import * as React from 'react';

import { cn } from '@/libs/utils';
import { EyeOff } from 'lucide-react';
import { Eye } from 'lucide-react';

const Input = React.forwardRef(({ type, className, ...props }, ref) => {
	const [show, setShow] = React.useState(false);
	const Icon = show ? EyeOff : Eye;

	return (
		<div className='relative'>
			<input
				type={type == 'password' && show ? 'text' : type}
				ref={ref}
				className={cn(
					'block p-3 text-sm w-full border border-zinc-200 rounded-xl focus:border-primary-500 focus:ring-primary-500 bg-zinc-100',
					className
				)}
				{...props}
			/>
			{type === 'password' && (
				<div className='absolute -translate-y-1/2 cursor-pointer top-1/2 right-4'>
					<Icon
						className='size-5 text-zinc-500 hover:text-primary-500'
						onClick={() => setShow(!show)}
					/>
				</div>
			)}
		</div>
	);
});

Input.displayName = 'Input';

export { Input };
