import { error, redirect } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import { createProjectSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';

export const load = async ({ locals }) => {
  const document = {
    title: 'Untitled',
    content: '',
    owner: locals.user.id,
  }
  let response;

  try {
    response = await locals.pb.collection('documents').create(document);
  } catch (err: any) {
    console.log('Error: ', err);
    throw error(err.status, err.message);
  }


  throw redirect(303, `/documents/${response.id}`);
};