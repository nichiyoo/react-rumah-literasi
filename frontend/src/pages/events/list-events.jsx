import * as React from 'react';
import useSWR from 'swr';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/heading';

import { Loading } from '@/components/loading';
import { Error } from '@/components/error';
import { Empty } from '@/components/empty';
import { EventCard } from '@/components/events/event-card';
import { useResultState } from '@/hooks/use-result-state';
import { Link } from 'react-router';

const ListEvents = () => {
	const { error, data, isLoading: loading } = useSWR('/public/events');
	const { result, empty } = useResultState(error, loading, data);

	return (
		<div className='container flex flex-col min-h-screen gap-8 py-24 max-w-7xl'>
			<div className='gap-4'>
				<h1 className='text-6xl font-bold'>Our Events</h1>
				<p className='text-zinc-600'>
					Discover our upcoming and past events that make an impact in our
					community, and join us for a fun-filled experience.
				</p>
			</div>

			<Error error={!loading && error} />
			<Empty empty={!loading && empty} />
			<Loading loading={loading} />

			<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
				{result.map((event) => (
					<Link to={'/events/' + event.id} key={event.id}>
						<EventCard event={event} />
					</Link>
				))}
			</div>
		</div>
	);
};

export default ListEvents;
