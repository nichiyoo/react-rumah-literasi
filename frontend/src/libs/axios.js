import base from 'axios';
export const { isAxiosError } = base;

const axios = base.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	withCredentials: true,
	withXSRFToken: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const fetcher = async (args) => {
	const [url, config] = Array.isArray(args) ? args : [args];
	const res = await axios.get(url, {
		...config,
	});
	return res.data;
};

export default axios;
