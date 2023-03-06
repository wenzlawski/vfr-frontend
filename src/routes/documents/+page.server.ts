import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = ({ locals }) => {
  const getUsersDocuments = async (userId) => {
    try {
      const documents = serializeNonPOJOs(
        await locals.pb.collection('documents').getFullList(undefined, {
          filter: `owner = "${userId}"`,
          sort: '-updated',
        })
      );
      return documents;
    } catch (err: any) {
      console.log('Error: ', err);
      throw error(err.status, err.message);
    }
  };

  return {
    documents: getUsersDocuments(locals.user.id)
  };
};

export const actions = {
  deleteDocument: async ({ request, locals }) => {
    const { id } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('documents').delete(id);
    } catch (err: any) {
      console.log('Error: ', err);
      throw error(err.status, err.message);
    }
    return {
      success: true
    };
  },

  upload: async ({ request, locals }) => {
    console.log('uploading document...');

    const formData = await request.formData();
    const file = formData.get("file") as File;
    console.log('file', file);

    let title = formData.get("title");

    if (!title) {
      title = "Unnamed"
    }

    const data = {
      title,
      content: await file.text(),
      owner: locals.user.id
    }

    let result;

    try {
      result = await locals.pb.collection('documents').create(data);
    } catch (err: any) {
      console.log('Error: ', err);
      throw error(err.status, err.message);
    }

    throw redirect(303, `/documents/${result.id}`);
  },

  upload_url: async ({ request, locals }) => {
    console.log('uploading document...');

    const { url } = await request.formData();
    let title = '';

    const text = await fetch("http://localhost:8080/api/v1/text/url_extract").then(res => res.text());

    console.log('text', text);


    if (!title) {
      title = "Unnamed"
    }

    const data = {
      title,
      content: await text,
      owner: locals.user.id
    }

    let result;

    try {
      result = await locals.pb.collection('documents').create(data);
    } catch (err: any) {
      console.log('Error: ', err);
      throw error(err.status, err.message);
    }

    throw redirect(303, `/documents/${result.id}`);
  },

  create: async ({ locals }) => {
    const document = {
      title: 'Untitled',
      content: '',
      owner: locals.user.id,
    }

    try {
      await locals.pb.collection('documents').create(document);
    } catch (err: any) {
      console.log('Error: ', err);
      throw error(err.status, err.message);
    }

    throw redirect(303, `/documents/{response.id}`);
  }
};