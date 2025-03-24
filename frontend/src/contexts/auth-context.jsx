import * as React from 'react';

import axios from '@/libs/axios';

const AuthContext = React.createContext({
	user: null,
	loading: true,
	signin: async () => {},
	signup: async () => {},
	signout: async () => {},
});

export function AuthProvider({ children }) {
	const [user, setUser] = React.useState(null);
	const [loading, setLoading] = React.useState(true);

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
	}, [user, setUser]);

	const signin = async ({ email, password }) => {
		const { data } = await axios.post('/auth/signin', {
			email,
			password,
		});
		setUser(data.data);
	};

	const signup = async ({ name, email, password }) => {
		const { data } = await axios.post('/auth/signup', {
			name,
			email,
			password,
		});
		setUser(data.data);
	};

	const signout = async () => {
		await axios.post('/auth/signout');
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, loading, signin, signup, signout }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
