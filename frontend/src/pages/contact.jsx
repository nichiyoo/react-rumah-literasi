import * as React from 'react';

import {
	Heading,
	HeadingDescription,
	Supertitle,
} from '@/components/ui/heading';

const Contact = () => {
	return (
		<React.Fragment>
			<div className='container grid gap-6 py-24 max-w-7xl'>
				<Heading>
					<Supertitle>Contact</Supertitle>
					<div className='p-6 overflow-hidden border bg-zinc-50 rounded-xl'>
						<iframe
							className='w-full rounded-xl aspect-banner bg-zinc-100'
							src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.28228573003!2d106.74711713910835!3d-6.229569453378052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sen!2sid!4v1742940925493!5m2!1sen!2sid'
						/>
					</div>
					<HeadingDescription>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
						temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
						reprehenderit ea tempore.
					</HeadingDescription>
				</Heading>
			</div>
		</React.Fragment>
	);
};

export default Contact;
