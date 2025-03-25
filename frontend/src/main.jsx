import '@/index.css';
import '@fontsource-variable/bricolage-grotesque';

import * as React from 'react';
import { toast } from 'sonner';
import { SWRConfig } from 'swr';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AuthProvider } from '@/contexts/auth-context';
import { ConfirmProvider } from '@/contexts/confirm-context';
import { RatelimitProvider } from '@/contexts/ratelimit-context';

import Router from '@/routes/router.jsx';
import { Toaster } from '@/components/ui/toaster';
import { fetcher, isAxiosError } from '@/libs/axios';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<SWRConfig
			value={{
				fetcher,
				onError: (error) => {
					toast.error('Failed to fetch data', {
						description: isAxiosError(error)
							? error.response.data.message || error.message
							: error.message,
					});
				},
			}}>
			<RatelimitProvider>
				<AuthProvider>
					<ConfirmProvider>
						<Router />
						<Toaster />
					</ConfirmProvider>
				</AuthProvider>
			</RatelimitProvider>
		</SWRConfig>
	</StrictMode>
);
