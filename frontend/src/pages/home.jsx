import * as React from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

const Home = () => {
	const ref = React.useRef(null);

	return (
		<React.Fragment>
			<div className='container grid items-center gap-6 py-24 lg:grid-cols-2 max-w-7xl'>
				<div className='flex flex-col gap-6'>
					<h1 className='text-6xl font-bold'>
						Shout My Name From The Rooftops
					</h1>
					<p className='text-zinc-600'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quidem
						ullam cupiditate laboriosam animi quae, aliquid quo, repellendus
						iste voluptas.
					</p>
					<div className='flex items-center gap-2'>
						<Button
							onClick={() =>
								ref.current.scrollIntoView({ behavior: 'smooth' })
							}>
							Read More
						</Button>
						<Link to='/about'>
							<Button variant='outline'>About Us</Button>
						</Link>
					</div>
				</div>

				<div className='relative order-first p-6 border rounded-full bg-zinc-50 size-full aspect-square border-zinc-200 lg:order-last'>
					<img
						alt='home'
						src='/hero.jpg'
						className='object-cover rounded-full size-full aspect-square'
					/>

					<div className='absolute top-0 xl:-right-20 xl:top-16'>
						<div className='relative p-6 text-sm origin-center bg-white border w-72 animate-slow-hover border-zinc-200 rounded-2xl'>
							<div className='absolute top-0 left-0 -m-1'>
								<div className='relative'>
									<div className='absolute inset-0 rounded-full size-3 bg-primary-500'></div>
									<div className='absolute inset-0 rounded-full size-3 bg-primary-500 animate-ping'></div>
								</div>
							</div>

							<h2 className='font-semibold'>Donate your books</h2>
							<p className='text-zinc-600'>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div
				ref={ref}
				className='container grid items-center gap-6 py-24 lg:grid-cols-2 max-w-7xl'>
				<img
					src='/about.jpg'
					alt='home'
					className='object-cover w-full max-w-lg mx-auto rounded-xl aspect-square'
				/>
				<div className='flex flex-col gap-6'>
					<h2 className='text-4xl font-bold'>About Us</h2>
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

			<div className='grid py-24 text-white bg-primary-600'>
				<div className='container max-w-7xl'>
					<div className='flex flex-col gap-6 text-center'>
						<h2 className='text-4xl font-bold'>Alur Donasi Buku</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation.
						</p>
						<div className='grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-4'>
							<img
								alt='steps'
								src='/steps/step-1.jpg'
								className='object-cover w-full rounded-lg aspect-thumbnail'
							/>
							<img
								alt='steps'
								src='/steps/step-2.jpg'
								className='object-cover w-full rounded-lg aspect-thumbnail'
							/>
							<img
								alt='steps'
								src='/steps/step-3.jpg'
								className='object-cover w-full rounded-lg aspect-thumbnail'
							/>
							<img
								alt='steps'
								src='/steps/step-4.jpg'
								className='object-cover w-full rounded-lg aspect-thumbnail'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='container py-24 max-w-7xl'>
				<div className='flex flex-col gap-6 text-center'>
					<h2 className='text-4xl font-bold'>Apa Itu Taman Baca?</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation.
					</p>

					<img
						src='/description.jpg'
						alt='home'
						className='object-cover w-full max-w-lg mx-auto rounded-xl aspect-square'
					/>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</p>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</p>

					<h2 className='mt-10 text-4xl font-bold'>Gallery Kami</h2>

					<div className='grid gap-6 md:grid-cols-2'>
						<img
							alt='gallery'
							src='/galleries/gallery-1.jpg'
							className='object-cover w-full rounded-lg aspect-video'
						/>
						<img
							alt='gallery'
							src='/galleries/gallery-2.jpg'
							className='object-cover w-full rounded-lg aspect-video'
						/>
						<img
							alt='gallery'
							src='/galleries/gallery-3.jpg'
							className='object-cover w-full rounded-lg aspect-video'
						/>
						<img
							alt='gallery'
							src='/galleries/gallery-4.jpg'
							className='object-cover w-full rounded-lg aspect-video'
						/>
						<img
							alt='gallery'
							src='/galleries/gallery-5.jpg'
							className='object-cover w-full rounded-lg md:col-span-full aspect-video'
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Home;
