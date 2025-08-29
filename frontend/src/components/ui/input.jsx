import * as React from 'react';

import { cn } from '@/libs/utils';

const Input = React.forwardRef(({ className, ...props }, ref) => {
	return (
		<input
			ref={ref}
			className={cn(
				'block p-3 text-sm w-full border border-zinc-300 rounded-xl shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-zinc-100',
				className
			)}
			{...props}></input>
	);
});

Input.displayName = 'Input';

export { Input };
