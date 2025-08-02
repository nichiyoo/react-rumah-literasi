import * as React from 'react';

const Unauhtorized = () => {
	return (
		<div className='container relative h-screen max-w-7xl'>
			<Link to='/' className='absolute top-0 left-0 m-6'>
				<Logo />
			</Link>

			<div className='flex flex-col items-center justify-center h-full gap-4 text-center '>
				<h1 className='font-bold text-8xl text-primary-500'>Unauthorized</h1>
				<p className='w-full max-w-2xl mx-auto'>
					You are not authorized to access this resource. Please contact the
					website administrator if you believe this is an error.
				</p>
				<Link to='/'>
					<Button>Back to Home Page</Button>
				</Link>
			</div>
		</div>
	);
};

export default Unauhtorized;
