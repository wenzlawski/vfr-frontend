import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import { getDocumentIds, insertDocument } from '$lib/db/document';

export const load = async ({ locals }) => {
	const getUsersDocuments = async (userId) => {
		try {
			const documents = serializeNonPOJOs(
				await getDocumentIds((await locals.getSession())?.user?.id)
			);
			console.log('documents', documents);
			return documents;
		} catch (err: any) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	const id = locals.getSession().then((session) => {
		session?.user?.id;
	});

	return {
		documents: getUsersDocuments(id)
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
		const file = formData.get('file') as File;
		console.log('file', file);

		let title = formData.get('title');

		if (!title) {
			title = 'Unnamed';
		}

		const data = {
			title,
			content: await file.text(),
			owner: locals.user.id
		};

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

		const text = await fetch('http://localhost:8080/api/v1/text/url_extract').then((res) =>
			res.text()
		);

		console.log('text', text);

		if (!title) {
			title = 'Unnamed';
		}

		const data = {
			title,
			content: await text,
			owner: locals.user.id
		};

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
		let response;

		try {
			response = await insertDocument((await locals.getSession())?.user?.id);
		} catch (err: any) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		console.log('response', response);

		throw redirect(303, `/documents/${response._id}`);
	}
};
