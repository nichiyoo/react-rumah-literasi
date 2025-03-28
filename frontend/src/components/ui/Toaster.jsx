import { Toaster as Sonner } from 'sonner';

const Toaster = ({ ...props }) => {
	return (
		<Sonner
			className='toaster group'
			toastOptions={{
				classNames: {
					toast:
						'group font-sans toast group-[.toaster]:text-foreground group-[.toaster]:border-primary-500 group-[.toaster]:rounded-2xl group-[.toaster]:shadow-none',
					description: 'group-[.toast]:text-muted-foreground',
					actionButton:
						'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
					cancelButton:
						'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
