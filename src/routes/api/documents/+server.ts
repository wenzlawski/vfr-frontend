import { updateDocument } from '$lib/db/document';
import { json } from '@sveltejs/kit';

export async function POST({ url, request }) {
	console.log('document', url);
	console.log('request.data', await request.json());
	console.log();

	// updateDocument()

	return json({ success: true });
}
