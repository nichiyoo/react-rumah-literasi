import useSWR from 'swr';

import {
	Heading,
	HeadingDescription,
	Supertitle,
} from '@/components/ui/heading';

import { Loading } from '@/components/loading';
import { Error } from '@/components/error';
import { Empty } from '@/components/empty';
import { EventCard } from '@/components/events/event-card';
import { useResultState } from '@/hooks/use-result-state';
import { Link } from 'react-router';
import { usePagination } from '@/hooks/use-pagination';
import { Pagination } from '@/components/pagination';

const ListEvents = () => {
	const { page, limit } = usePagination();

	const {
		error,
		data,
		isLoading: loading,
	} = useSWR([
		'events',
		{
			params: {
				page: page,
				limit: limit,
			},
		},
	]);

	const { result, pagination, empty } = useResultState(error, loading, data);

	return (
		<div className='container flex flex-col min-h-screen gap-8 py-24 max-w-7xl'>
			<Heading>
				<Supertitle>Events List</Supertitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
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

			{pagination && <Pagination pagination={pagination} />}
		</div>
	);
};

export default ListEvents;
