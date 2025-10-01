import * as React from 'react';
import { cn } from '@/libs/utils';

const HeadingTitle = React.forwardRef(
	({ className, children, ...props }, ref) => {
		return (
			<h1 className={cn('text-4xl font-bold', className)} ref={ref} {...props}>
				{children}
			</h1>
		);
	}
);

HeadingTitle.displayName = 'HeadingTitle';

const HeadingDescription = React.forwardRef(
	({ className, children, ...props }, ref) => {
		return (
			<p className={cn('text-zinc-600', className)} ref={ref} {...props}>
				{children}
			</p>
		);
	}
);

HeadingDescription.displayName = 'HeadingDescription';

const Heading = React.forwardRef(({ className, children, ...props }, ref) => {
	return (
		<div className={cn('flex flex-col gap-2', className)} ref={ref} {...props}>
			{children}
		</div>
	);
});

Heading.displayName = 'Heading';

export { HeadingTitle, HeadingDescription, Heading };
