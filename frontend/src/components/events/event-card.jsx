import { Link } from 'react-router';
import { formatDate } from '@/libs/utils';
import { Clock, Calendar } from 'lucide-react';
import { User2 } from 'lucide-react';

const EventCard = ({ event }) => {
	return (
		<Link className='block group' to={'/events/' + event.id}>
			<div className='overflow-hidden bg-white border rounded-xl'>
				<div className='aspect-[4/3] overflow-hidden'>
					<img
						src={event.media}
						alt={event.title}
						className='object-cover size-full bg-zinc-100'
					/>
				</div>
				<div className='flex flex-col gap-4 p-4 text-zinc-500'>
					<h3 className='text-lg font-semibold text-zinc-900 line-clamp-1'>
						{event.title}
					</h3>

					<div className='flex items-center justify-between text-sm'>
						<div className='flex items-center gap-1'>
							<Calendar className='size-4 text-primary-500' />
							<span>{formatDate(event.date)}</span>
						</div>
						<div className='flex items-center gap-1'>
							<User2 className='size-4 text-primary-500' />
							<span>{event.user.name}</span>
						</div>
					</div>

					<p className='line-clamp-3'>{event.description}</p>
				</div>
			</div>
		</Link>
	);
};

export { EventCard };
