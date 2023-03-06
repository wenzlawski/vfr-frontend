import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import { serialize } from 'object-to-formdata';

export const load = async ({ locals, params }) => {
  if (!locals.pb.authStore.isValid) {
    throw error(401, 'Unauthorized');
  }

  try {
    const document = serializeNonPOJOs(
      await locals.pb.collection('documents').getOne(params.docId)
    );

    if (locals.user.id === document.owner) {
      return {
        document
      };
    } else {
      throw error(403, 'Forbidden');
    }
  } catch (err: any) {
    console.log('Error: ', err);
    throw error(err.status, err.message);
  }
};

export const actions = {
  updateDocument: async ({ request, locals, params }) => {
    const formData = await request.formData();

    // if (errors) {
    // return undefined
    // return invalid(400, {
    //   data: rest,
    //   errors: errors.fieldErrors
    // });
    // }

    try {
      await locals.pb.collection('documents').update(params.docId, serialize(formData));
    } catch (err: any) {
      console.log('Error: ', err);
      throw error(err.status, err.message);
    }

    throw redirect(303, `/documents`);
  },
};