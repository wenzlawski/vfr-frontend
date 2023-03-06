import { error, redirect } from '@sveltejs/kit';


export const actions = {
  default: async ({ request, locals }) => {
    console.log('uploading document...');
    const formData = await request.formData();
    const file = formData.get("file") as File;
    let title = formData.get("title");
    // console.log('file', file);


    if (title === '') {
      title = "Unnamed"
    }

    let data = {
      title,
      content: await file.text(),
      owner: locals.user.id
    }

    try {
      await locals.pb.collection('documents').create(data);
    } catch (err: any) {
      console.log('Error: ', err);
      throw error(err.status, err.message);
    }

    throw redirect(303, '/documents');
  },

  url: async ({ request, locals }) => {
    console.log('uploading document...');

    const formData = await request.formData();
    const file = formData.get("file") as File;
    let title = formData.get("title");
    // console.log('file', file);
  }
};