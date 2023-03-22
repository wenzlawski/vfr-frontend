import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import { deleteDocument, getDocumentsPreview, updateDocument, emptyTrash } from '$lib/db/document';

export const load = async ({ locals }) => {
	const getUsersDocuments = async (userId) => {
		try {
			const documents = serializeNonPOJOs(await getDocumentsPreview(userId, true));
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
	restore: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		try {
			await updateDocument(id, { deleted: false });
		} catch (err: any) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true,
			message: 'restored'
		};
	},

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
			message: 'permanently deleted'
		};
	},

	empty: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		try {
			await emptyTrash(id);
		} catch (err: any) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true,
			message: 'deleted'
		};
	}
};
