import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import {
	deleteDocument,
	getDocumentsNoContent,
	getDocumentsPreview,
	insertDocument
} from '$lib/db/document';
import { extract } from '@extractus/article-extractor';

export const load = async ({ locals }) => {
	const getUsersDocuments = async (userId) => {
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
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		try {
			await deleteDocument(id);
		} catch (err: any) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true,
			message: 'deleted'
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
			console.log(article);
		} catch (err) {
			console.error(err);
		}
		console.log('article', article);

		if (!article) {
			return error(300, 'Unable to extract article from URL');
		}

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
			response = await insertDocument({ createdBy: (await locals.getSession())?.user?.id });
		} catch (err: any) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, `/documents/${response._id}`);
	},

	download: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		try {
			console.log('downloading document...', id);
		} catch (err: any) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true,
			message: 'downloaded'
		};
	}
};
