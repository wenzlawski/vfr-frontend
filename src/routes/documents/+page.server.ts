import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import {
  getDocumentById,
  getDocumentsPreview,
  insertDocument,
  updateDocument
} from '$lib/db/document';
import { extract } from '@extractus/article-extractor';

export const load = async ({ locals }) => {
  const getUsersDocuments = async (userId: string) => {
    try {
      const documents = serializeNonPOJOs(await getDocumentsPreview(userId));
      return documents;
    } catch (err: any) {
      console.log('Error: ', err);
      throw error(err.status, err.message);
    }
  };

  const id = (await locals.getSession())?.user.id;

  return {
    documents: getUsersDocuments(id)
  };
};

export const actions = {
  delete: async ({ locals, request }) => {
    const data = await request.formData();
    const id = data.get('id') as string;
    const userId = (await locals.getSession())?.user?.id;

    try {
      await updateDocument(id, { deleted: true }, userId);
    } catch (err: any) {
      console.log('Error: ', err);
      throw error(err.status, err.message);
    }
    return {
      type: 'delete',
      message: 'Successfully deleted document'
    };
  },

  upload_url: async ({ request, locals }) => {
    console.log('uploading document...');

    const fdata = await request.formData();
    const url = fdata.get('url') as string;
    console.log('data', fdata);
    console.log('url', url);

    let article;

    try {
      article = await extract(url);
    } catch (err) {
      // console.error(err);
      throw error(500, 'Unable to extract article from URL');
    }
    console.log('article', article);

    const data = {
      title: article.title,
      content: article.content,
      createdBy: (await locals.getSession())?.user?.id
    };

    let id;

    try {
      id = (await insertDocument(data))._id;
    } catch (err: any) {
      console.log('Error: ', err);
      throw error(err.status, err.message);
    }
    throw redirect(303, `/documents/${id}`);
  },

  create: async ({ locals }) => {
    let response;
    console.log('adding document');

    try {
      response = await insertDocument({
        createdBy: (await locals.getSession())?.user?.id
      });
    } catch (err: any) {
      console.log('error: ', err);
      throw error(err.status, err.message);
    }

    throw redirect(303, `/documents/${response._id}`);
  },

  download: async ({ locals, request }) => {
    const data = await request.formData();
    const id = data.get('id') as string;
    const userId = (await locals.getSession())?.user?.id;

    try {
      const document = await getDocumentById(id, userId);
      return {
        type: 'download',
        content: document.content,
        title: document.title,
        message: 'Successfully downloaded document'
      };
    } catch (err: any) {
      console.log('Error: ', err);
      throw error(err.status, err.message);
    }
  }
};
