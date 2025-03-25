import * as React from 'react';

import axios, { onUnautenticated } from '@/libs/axios';
import useLocalStorage from '@/hooks/use-localstorage';

const AuthContext = React.createContext({
	user: null,
	session: null,
	loading: true,
	signin: async () => {},
	signup: async () => {},
	validate: async () => {},
	signout: async () => {},
});

export function AuthProvider({ children }) {
	const [user, setUser] = React.useState(null);
	const [loading, setLoading] = React.useState(true);
	const [session, setSession] = useLocalStorage('session', null);

	React.useEffect(() => {
		const profile = async () => {
			try {
				setLoading(true);
				const { data } = await axios.get('/auth/profile');
				setUser(data.data);
			} catch (error) {
				setUser(null);
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		if (!user) profile();

		onUnautenticated(() => {
			setUser(null);
		});
	}, [user, setUser, setSession]);

	const signin = async ({ email, password }) => {
		const { data } = await axios.post('/auth/signin', {
			email,
			password,
		});
		setSession(data.data);
	};

	const signup = async ({ name, email, password }) => {
		await axios.post('/auth/signup', {
			name,
			email,
			password,
		});
	};

	const validate = async ({ otp }) => {
		const { data } = await axios.post('/auth/validate', {
			otp,
		});
		setSession(null);
		setUser(data.data);
	};

	const signout = async () => {
		await axios.post('/auth/signout');
		setSession(null);
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				session,
				loading,
				signin,
				signup,
				validate,
				signout,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
