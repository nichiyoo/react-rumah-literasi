import * as React from 'react';

import { cn } from '@/libs/utils';

const Input = React.forwardRef(({ className, ...props }, ref) => {
	return (
		<input
			ref={ref}
			className={cn(
				'block p-3 w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm',
				className
			)}
			{...props}></input>
	);
});

Input.displayName = 'Input';

export { Input };
