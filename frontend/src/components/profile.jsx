import * as React from 'react';

import { Link } from 'react-router';
import { Avatar } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';

const Profile = () => {
	const { user } = useAuth();

	return (
		<Link to='/dashboard/profile' className='flex items-center gap-2'>
			<React.Fragment>
				<Avatar name={user.name} />
				<div className='flex-col flex-none hidden gap-1 text-sm leading-none lg:flex'>
					<span className='font-medium'>{user.name}</span>
					<span className='text-zinc-500'>{user.email}</span>
				</div>
			</React.Fragment>
		</Link>
	);
};

export default Profile;
