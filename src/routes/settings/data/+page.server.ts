import { error, redirect } from '@sveltejs/kit';

export const actions = {
  deleteAllDocuments: async ({ locals }) => {

    try {
      const response = await locals.pb.collection('documents').getFullList(undefined, {
        filter: `owner = "${locals.user.id}"`
      })
      for (let document of response) {
        await locals.pb.collection('documents').delete(document.id);
      }
    } catch (err) {
      console.log('Error: ', err);

      throw error(400, 'Something went wrong updating your profile');
    }

    return redirect(303, '/documents');
  }
};