import { error, redirect } from '@sveltejs/kit';
import { updatePasswordSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';

export const load = ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, '/login');
  }
};

export const actions = {
  updatePassword: async ({ request, locals }) => {
    const { formData, errors } = await validateData(await request.formData(), updatePasswordSchema);

    if (errors) {
      return undefined
      // return error(400, {
      //   errors: errors.fieldErrors
      // });
    }

    try {
      await locals.pb.collection('users').update(locals.user.id, formData);
      locals.pb.authStore.clear();
    } catch (err) {
      console.log('Error: ', err);
      //@ts-ignore
      throw error(err.status, err.message);
    }

    throw redirect(303, '/login');
  }
};