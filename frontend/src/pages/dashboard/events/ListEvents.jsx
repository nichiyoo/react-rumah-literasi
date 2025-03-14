import * as React from 'react';
import axios from '@/libs/axios';

import {
	Heading,
	HeadingDescription,
	HeadingTitle,
} from '@/components/ui/Heading';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const ListEvents = () => {
	const [events, setEvents] = React.useState(null);

	React.useEffect(() => {
		const fetchEvents = async () => {
			try {
				const { data } = await axios.get('/events');
				const { data: events } = data;
				setEvents(events);
			} catch (error) {
				console.error(error);
			}
		};

		fetchEvents();
	}, []);

	return (
		<div className='grid gap-8'>
			<Heading>
				<HeadingTitle>Events List</HeadingTitle>
				<HeadingDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo fuga
					temporibus laudantium nesciunt voluptas iure, blanditiis quisquam
					reprehenderit ea tempore.
				</HeadingDescription>
			</Heading>

			<div className='w-full overflow-x-auto border border-gray-200 rounded-lg'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{events && events.length > 0 ? (
							events.map((event) => (
								<TableRow key={event.id}>
									<TableCell>{event.title}</TableCell>
									<TableCell>{event.description}</TableCell>
									<TableCell>{event.date}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={4} className='py-10 text-center'>
									<span className='text-gray-500'>
										Tidak ada data yang ditemukan
									</span>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default ListEvents;
