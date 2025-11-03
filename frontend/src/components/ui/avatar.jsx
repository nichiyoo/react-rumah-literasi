import { cn } from '@/libs/utils';
import * as React from 'react';

const Avatar = React.forwardRef(({ name, className, ...props }, ref) => {
	const url = new URL('https://ui-avatars.com/api/');

	url.searchParams.append('background', 'f4f4f5');
	url.searchParams.append('font-size', '0.33');
	url.searchParams.append('format', 'svg');
	url.searchParams.append('bold', 'true');
	url.searchParams.append('name', name);

	const result = url.toString();

	return (
		<img
			{...props}
			ref={ref}
			src={result}
			className={cn(
				'flex-none border rounded-full size-10 border-zinc-300',
				className
			)}
		/>
	);
});

Avatar.displayName = 'Avatar';

export { Avatar };
