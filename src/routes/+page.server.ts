import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
  throw redirect(303, '/documents');
};

export const actions: Actions = {
  switchTheme: async ({ request, cookies }) => {
    const data = await request.formData();
    const theme = data.get('theme') as string;
    console.log('switched theme to ', theme);

    if (theme) {
      cookies.set('theme', theme, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365
      });
    }
    return { success: true };
  }
};
