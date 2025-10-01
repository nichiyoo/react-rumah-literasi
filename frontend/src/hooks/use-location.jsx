import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/libs/axios';

export const useLocation = () => {
	const [province, setProvince] = useState(null);
	const [city, setcity] = useState(null);

	const {
		data: provincesData,
		error: provincesError,
		isLoading: provincesLoading,
	} = useSWR('/places/provinces', fetcher);

	const {
		data: citiesData,
		error: citiesError,
		isLoading: citiesLoading,
	} = useSWR(province ? `/places/provinces/${province}` : null, fetcher);

	const {
		data: districtsData,
		error: districtsError,
		isLoading: districtsLoading,
	} = useSWR(
		province && city ? `/places/provinces/${province}/${city}` : null,
		fetcher
	);

	const provinces = provincesData?.data || [];
	const districts = districtsData?.data || [];
	const cities = citiesData?.data || [];

	const loading = {
		provinces: provincesLoading,
		districts: districtsLoading,
		cities: citiesLoading,
	};

	const error = provincesError || citiesError || districtsError;

	const handleProvinceChange = (provinceId) => {
		setProvince(provinceId);
		setcity(null);
	};

	const handleCityChange = (cityId) => {
		setcity(cityId);
	};

	return {
		provinces,
		cities,
		districts,
		loading,
		error,
		province,
		city,
		handleProvinceChange,
		handleCityChange,
	};
};
