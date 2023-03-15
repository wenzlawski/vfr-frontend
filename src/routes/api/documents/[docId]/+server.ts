import { updateDocument } from '$lib/db/document';
import { error, json } from '@sveltejs/kit';

export async function POST({ url, request, params }) {
	const j = await request.json();

	try {
		updateDocument(params.docId, j);
	} catch (err: any) {
		console.log('Error: ', err);
		throw error(200, { message: 'Error updating document' });
	}

	console.log('success updating');

	return json({ success: true });
}
