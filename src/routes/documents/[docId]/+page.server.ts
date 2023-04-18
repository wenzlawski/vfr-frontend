// import { getDocumentById } from '$lib/db/document';
// import { serializeNonPOJOs } from '$lib/utils';
// import { error } from '@sveltejs/kit';
//
// export const load = ({ locals, params }) => {
// 	const getDocument = async (docId) => {
// 		const userId = (await locals.getSession())?.user?.id;
// 		try {
// 			const document = serializeNonPOJOs(await getDocumentById(docId, userId));
// 			return document;
// 		} catch (err: any) {
// 			console.log('Error: ', err);
// 			throw error(err.status, err.message);
// 		}
// 	};
// 	return {
// 		document: getDocument(params.docId),
// 		id: params.docId
// 	};
// };
//
// 		locals.getSession().then((session) => {
// 			getDocumentById(docId, session?.user?.id).then((document) => {
// 				return serializeNonPOJOs(document);
// 			)
// 			.catch((err: any) => {;
// 				console.log('Error: ', err);
// 				throw error(err.status, err.message);
// 			});
//

import { getDocumentById } from '$lib/db/document';
import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
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

	console.log('getting document');

	const documentPromise = getDocument(params.docId)
		.then((document) => {
			return { document, id: params.docId };
		})
		.catch((err) => {
			throw err;
		});

	return {
		document: documentPromise
	};
};
