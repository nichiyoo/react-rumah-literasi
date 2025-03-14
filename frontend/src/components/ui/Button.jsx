import * as React from 'react';

import { cn } from '@/libs/utils';

const Button = React.forwardRef(
	({ variant = 'primary', className, children, ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(
					'inline-flex items-center justify-center rounded-full border px-7 py-2.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
					variant === 'primary' &&
						'bg-primary-500 text-white hover:bg-primary-600 focus:bg-primary-600 border-transparent',
					variant === 'outline' &&
						'bg-transparent text-primary-500 hover:bg-primary-500 hover:text-white focus:bg-primary-500 focus:text-white border-zinc-200',
					className
				)}
				{...props}>
				<span>{children}</span>
			</button>
		);
	}
);

Button.displayName = 'Button';

export { Button };
