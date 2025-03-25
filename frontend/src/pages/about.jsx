import * as React from 'react';

const About = () => {
	return (
		<React.Fragment>
			<div className='container grid items-center gap-6 py-24 lg:grid-cols-2 max-w-7xl'>
				<img
					src='/about.jpg'
					alt='home'
					className='object-cover w-full max-w-lg mx-auto rounded-full aspect-square'
				/>
				<div className='flex flex-col gap-6'>
					<h1 className='text-6xl font-bold'>About Us</h1>
					<p className='text-zinc-600'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>
			</div>
		</React.Fragment>
	);
};

export default About;
