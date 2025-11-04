import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Map } from '@/components/map';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DEFAULT_LOCATION } from '@/libs/constant';
import { useConfirm } from '@/hooks/use-confirm';
import { useLocation } from '@/hooks/use-location';

const BookDonationSchema = z.object({
	title: z.string().min(3),
	genre: z.string().min(3),
	amount: z.coerce.number().min(1),
	province_id: z.string().min(1, 'Province is required'),
	city_id: z.string().min(1, 'City is required'),
	district_id: z.string().min(1, 'District is required'),
	address: z.string().min(3),
	latitude: z.coerce.number(),
	longitude: z.coerce.number(),
	zipcode: z
		.string()
		.min(5, 'Zipcode must be 5 digits')
		.max(5, 'Zipcode must be 5 digits'),
});

const EditSchema = BookDonationSchema.merge(
	z.object({
		status: z.enum(['pending', 'ongoing', 'accepted', 'rejected']),
	})
);

const BookDonationForm = ({ initial, action, label }) => {
	const { confirm } = useConfirm();
	const {
		provinces,
		cities,
		districts,
		province,
		city,
		handleCityChange,
		handleProvinceChange,
		loading,
	} = useLocation();

	const {
		watch,
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(initial ? EditSchema : BookDonationSchema),
		defaultValues: initial || {
			title: '',
			genre: '',
			amount: 1,
			province_id: '',
			city_id: '',
			district_id: '',
			zipcode: '',
			address: '',
			...DEFAULT_LOCATION,
		},
	});

	const handleUseMyLocation = async () => {
		confirm({
			title: 'Use my location',
			description: 'Are you sure you want to use your location?',
		})
			.then(async () => {
				if ('geolocation' in navigator) {
					navigator.geolocation.getCurrentPosition(
						(position) => {
							const { latitude, longitude } = position.coords;
							setValue('latitude', latitude);
							setValue('longitude', longitude);
						},
						(error) => {
							console.error('Error getting location:', error);
							alert(
								'Unable to retrieve your location. Please check your browser permissions.'
							);
						},
						{ enableHighAccuracy: true }
					);
				}
			})
			.catch(() => {
				// pass
			});
	};

	return (
		<form onSubmit={handleSubmit(action)} className='grid gap-6 lg:grid-cols-2'>
			<div className='col-span-full'>
				<Label htmlFor='title'>Title</Label>
				<Input
					type='text'
					placeholder='Enter the title of the book'
					{...register('title')}
				/>
				{errors.title && (
					<span className='text-red-500'>{errors.title.message}</span>
				)}
			</div>

			<div>
				<Label htmlFor='genre'>Genre</Label>
				<Input
					type='text'
					placeholder='Enter the genre of the book'
					{...register('genre')}
				/>
				{errors.genre && (
					<span className='text-red-500'>{errors.genre.message}</span>
				)}
			</div>

			<div>
				<Label htmlFor='amount'>Amount</Label>
				<Input
					type='number'
					placeholder='Enter the amount of books'
					{...register('amount')}
				/>
				{errors.amount && (
					<span className='text-red-500'>{errors.amount.message}</span>
				)}
			</div>

			<div>
				<Label htmlFor='province_id'>Province</Label>
				<select
					className='block w-full p-3 border bg-zinc-100 border-zinc-200 rounded-xl focus:border-primary-500 focus:ring-primary-500 sm:text-sm'
					{...register('province_id')}
					onChange={(e) => handleProvinceChange(e.target.value)}
					disabled={loading.provinces}>
					<option value=''>Select a province</option>
					{provinces.map((province) => (
						<option key={province.id} value={province.id}>
							{province.name}
						</option>
					))}
				</select>
				{errors.province_id && (
					<span className='text-red-500'>{errors.province_id.message}</span>
				)}
			</div>

			<div>
				<Label htmlFor='city_id'>City</Label>
				<select
					className='block w-full p-3 border bg-zinc-100 border-zinc-200 rounded-xl focus:border-primary-500 focus:ring-primary-500 sm:text-sm'
					{...register('city_id')}
					onChange={(e) => handleCityChange(e.target.value)}
					disabled={loading.cities || !province}>
					<option value=''>Select a city</option>
					{cities.map((city) => (
						<option key={city.id} value={city.id}>
							{city.name}
						</option>
					))}
				</select>
				{errors.city_id && (
					<span className='text-red-500'>{errors.city_id.message}</span>
				)}
			</div>

			<div>
				<Label htmlFor='district_id'>District</Label>
				<select
					className='block w-full p-3 border bg-zinc-100 border-zinc-200 rounded-xl focus:border-primary-500 focus:ring-primary-500 sm:text-sm'
					{...register('district_id')}
					disabled={loading.districts || !city}>
					<option value=''>Select a district</option>
					{districts.map((district) => (
						<option key={district.id} value={district.id}>
							{district.name}
						</option>
					))}
				</select>
				{errors.district_id && (
					<span className='text-red-500'>{errors.district_id.message}</span>
				)}
			</div>

			<div>
				<Label htmlFor='zipcode'>Zipcode</Label>
				<Input
					type='text'
					placeholder='Enter zipcode'
					maxLength={5}
					pattern='[0-9]*'
					{...register('zipcode')}
				/>
				{errors.zipcode && (
					<span className='text-red-500'>{errors.zipcode.message}</span>
				)}
			</div>

			<div className='col-span-full'>
				<Label htmlFor='address'>Address</Label>
				<Textarea placeholder='Enter your address' {...register('address')} />
				{errors.address && (
					<span className='text-red-500'>{errors.address.message}</span>
				)}
			</div>

			<div className='col-span-full'>
				<Label htmlFor='location'>Location</Label>
				<Map
					location={{
						latitude: watch('latitude'),
						longitude: watch('longitude'),
					}}
					className='aspect-banner'
					setLocation={(location) => {
						setValue('latitude', location.latitude);
						setValue('longitude', location.longitude);
					}}
				/>
			</div>

			{initial && (
				<div>
					<Label htmlFor='status'>Status</Label>
					<select
						className='block w-full p-3 border border-zinc-200 rounded-xl focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-zinc-100'
						{...register('status')}>
						<option value='pending'>Pending</option>
						<option value='ongoing'>Ongoing</option>
						<option value='accepted'>Accepted</option>
						<option value='rejected'>Rejected</option>
					</select>
					{errors.status && (
						<span className='text-red-500'>{errors.status.message}</span>
					)}
				</div>
			)}

			<div className='flex items-center gap-2 col-span-full'>
				<Button>{label}</Button>
				<Button variant='outline' type='button' onClick={handleUseMyLocation}>
					Use my location
				</Button>
			</div>
		</form>
	);
};

export default BookDonationForm;
