import * as React from 'react';
import { Link } from 'react-router';

import { cn } from '@/libs/utils';
import { useAuth } from '@/hooks/use-auth';

import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';

const Navbar = ({ className }) => {
	const { user } = useAuth();

	return (
		<nav className={cn('w-full', className)}>
			<div className='flex items-center justify-between'>
				<Link to='/'>
					<Logo />
				</Link>

				<ul className='items-center hidden gap-8 font-medium lg:flex'>
					<li>
						<Link to='/' className='hover:text-primary-500'>
							Home
						</Link>
					</li>
					<li>
						<Link to='/about' className='hover:text-primary-500'>
							About
						</Link>
					</li>
					<li>
						<Link to='/contact' className='hover:text-primary-500'>
							Contact
						</Link>
					</li>
				</ul>

				<div className='flex items-center gap-2'>
					{user ? (
						<Link to='/dashboard'>
							<Button variant='outline'>Dashboard</Button>
						</Link>
					) : (
						<Link to='/auth/signin'>
							<Button>Login</Button>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
