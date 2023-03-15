import { getDocumentById } from '$lib/db/document';
import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load = ({ locals, params }) => {
	const getDocument = async (docId) => {
		const userId = (await locals.getSession())?.user?.id;
		try {
			const document = serializeNonPOJOs(await getDocumentById(docId, userId));
			return document;
		} catch (err: any) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		document: getDocument(params.docId),
		id: params.docId
	};
};
