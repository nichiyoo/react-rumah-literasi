import '@/index.css';
import '@fontsource-variable/bricolage-grotesque';

import Router from '@/routes/Router.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Router />
	</StrictMode>
);
