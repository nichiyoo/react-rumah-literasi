import '@/index.css';
import '@fontsource-variable/bricolage-grotesque';

import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Router from '@/routes/router.jsx';
import { Toaster } from '@/components/ui/toaster';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<React.Fragment>
			<Router />
			<Toaster />
		</React.Fragment>
	</StrictMode>
);
