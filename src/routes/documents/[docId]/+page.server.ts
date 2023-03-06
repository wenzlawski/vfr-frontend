import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load = ({ locals, params }) => {
  const getDocument = async (docId) => {
    try {
      const document = serializeNonPOJOs(await locals.pb.collection('documents').getOne(docId));
      return document;
    } catch (err: any) {
      console.log('Error: ', err);
      throw error(err.status, err.message);
    }
  };

  return {
    document: getDocument(params.docId)
  };
};