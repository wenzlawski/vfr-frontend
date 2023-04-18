import { error, json } from '@sveltejs/kit';
import MargotEndpoint from '$lib/handlers/margot';

export async function POST({ request }) {
	const { text, opts } = await request.json();

	const margot = new MargotEndpoint();

	try {
		const response = await margot.fetchData(text, opts);

		return json({ success: true, response });
	} catch (err: any) {
		console.log('Error: ', err);
		throw error(200, { message: 'Error updating document' });
	}
}
