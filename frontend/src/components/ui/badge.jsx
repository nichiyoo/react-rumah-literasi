import { cn } from '@/libs/utils';
import * as React from 'react';

const Badge = React.forwardRef(
	({ variant = 'primary', children, className, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={cn(
					'flex-none whitespace-nowrap items-center rounded-full px-3 py-1 text-xs font-medium ',
					variant == 'primary' && 'bg-primary-500 text-white',
					variant == 'outline' && 'text-primary-500 border-zinc-200',
					variant == 'desctructive' && 'bg-red-500 text-white',
					className
				)}
				{...props}>
				{children}
			</span>
		);
	}
);

Badge.displayName = 'Badge';

export { Badge };
