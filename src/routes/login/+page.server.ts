import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request, locals, url }) => {
    const data = Object.fromEntries(await request.formData()) as {
      email: string
      password: string
    }

    console.log('logging in with', data);

    try {
      await locals.pb.collection('users').authWithPassword(data.email, data.password)
    } catch (err: any) {
      console.log("error", err);
      return {
        error: true,
        msg: err.data.message
      }
    }
    if (url.searchParams.has('redirectTo')) {
      throw redirect(303, url.searchParams.get('redirectTo')?.toString() ?? '/');
    }

    throw redirect(303, "/");
  },
};
