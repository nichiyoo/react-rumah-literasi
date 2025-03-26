import '@/index.css';
import '@fontsource-variable/bricolage-grotesque';

import * as React from 'react';
import { toast } from 'sonner';
import { SWRConfig } from 'swr';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AuthProvider } from '@/contexts/auth-context';
import { ConfirmProvider } from '@/contexts/confirm-context';

import Router from '@/routes/router.jsx';
import { Toaster } from '@/components/ui/toaster';
import { fetcher } from '@/libs/axios';
import { ERROR_MESSAGES } from './libs/constant';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<SWRConfig
			value={{
				fetcher,
				onError: (error, key) => {
					if (key === '/auth/profile') return;
					const message = ERROR_MESSAGES[error.response.status];
					toast.error('Failed to load resource', {
						description: error.response.data.message || message,
					});
				},
			}}>
			<AuthProvider>
				<ConfirmProvider>
					<Router />
					<Toaster />
				</ConfirmProvider>
			</AuthProvider>
		</SWRConfig>
	</StrictMode>
);
