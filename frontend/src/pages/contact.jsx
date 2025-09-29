import * as React from 'react';

const Contact = () => {
	return (
		<React.Fragment>
			<div className='container grid gap-6 py-24 max-w-7xl'>
				<h1 className='text-6xl font-bold'>Contact</h1>

				<div className='p-6 overflow-hidden border bg-zinc-50 rounded-2xl'>
					<iframe
						className='w-full rounded-lg aspect-banner bg-zinc-100'
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.28228573003!2d106.74711713910835!3d-6.229569453378052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sen!2sid!4v1742940925493!5m2!1sen!2sid'
					/>
				</div>

				<p className='text-zinc-600'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</div>
		</React.Fragment>
	);
};

export default Contact;
