import type { Actions } from './$types';

export const actions: Actions = {
	switchTheme: async ({ cookies }) => {
		const theme = cookies.get('theme');
		if (theme) {
			cookies.set('theme', theme === 'dark' ? 'light' : 'dark', {
				path: '/',
				maxAge: 60 * 60 * 24 * 365
			});
		}
		return { success: true };
	}
};
