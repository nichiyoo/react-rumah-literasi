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
		<div className='container min-h-screen py-24 max-w-7xl'>
			<div className='grid gap-8'>
				<Heading>
					<HeadingTitle>Our Events</HeadingTitle>
					<HeadingDescription>
						Discover our upcoming and past events that make an impact in our
						community.
					</HeadingDescription>
				</Heading>

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
		</div>
	);
};

export default ListEvents;
