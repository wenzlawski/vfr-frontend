import { updateDocument, getDocumentById } from '$lib/db/document';
import { error, json } from '@sveltejs/kit';

export async function GET({ params, locals }) {
	const userId = (await locals.getSession())?.user?.id;
	const doc = await getDocumentById(params.docId, userId);
	return json(doc);
}

export async function POST({ request, params, locals }) {
	const j = await request.json();
	const userId = (await locals.getSession())?.user?.id;
	j.createdBy = userId;

	try {
		updateDocument(params.docId, j, userId);
	} catch (err: any) {
		console.log('Error: ', err);
		throw error(200, { message: 'Error updating document' });
	}

	console.log('success updating');

	return json({ success: true });
}
