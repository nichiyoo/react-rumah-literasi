import * as React from 'react';

import { toast } from 'sonner';
import { onRateLimited } from '@/libs/axios';

const RatelimitContext = React.createContext();

export function RatelimitProvider({ children }) {
	React.useEffect(() => {
		onRateLimited(() => {
			toast.error('Rate limit exceeded', {
				description: 'You have exceeded the rate limit, try again later.',
			});
		});
	}, []);

	return <RatelimitContext.Provider>{children}</RatelimitContext.Provider>;
}
