import * as React from 'react';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

const Setting = () => {
	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Application Setting</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>
		</div>
	);
};

export default Setting;
