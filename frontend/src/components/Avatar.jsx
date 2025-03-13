import * as React from 'react';
import { Link } from 'react-router';

const Avatar = () => {
	return (
		<Link to='/dashboard/profile' className='flex items-center gap-2'>
			<div className='flex-none bg-gray-100 rounded-full size-10' />
			<span className='font-medium'>Username</span>
		</Link>
	);
};

export default Avatar;
