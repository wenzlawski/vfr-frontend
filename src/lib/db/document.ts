import dbConnect from './mongoose';
import TextDocument from '$lib/models/document';
// import { error } from '@sveltejs/kit';
import type { ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';

export async function insertDocument(data) {
	await dbConnect();
	const doc = new TextDocument(data);
	doc.save();
	return doc;
}

export async function deleteDocument(docId: string) {
	await dbConnect();
	await TextDocument.findByIdAndDelete(docId);
}

export async function getDocuments(owner: ObjectId, limit = 10, skip = 0) {
	await dbConnect();
	const docs = await TextDocument.find({ createdBy: owner }).skip(skip).limit(limit).sort({
		lastModifiedAt: 'desc'
	});

	return docs.map((doc) => {
		return {
			id: doc._id.toString(),
			title: doc.title,
			content: doc.content,
			createdAt: doc.createdAt,
			lastModified: doc.lastModified
		};
	});
}

export async function getDocumentsPreview(
	owner: ObjectId | string,
	limit = 10,
	skip = 0,
	length = 200
) {
	await dbConnect();
	const docs = await TextDocument.find({ createdBy: owner }).skip(skip).limit(limit).sort({
		lastModified: 'desc'
	});

	return docs.map((doc) => {
		return {
			id: doc._id.toString(),
			title: doc.title,
			content: doc.content.substring(0, length),
			createdAt: doc.createdAt,
			lastModified: doc.lastModified
		};
	});
}

export async function getDocumentsNoContent(owner: ObjectId | string, limit = 10, skip = 0) {
	await dbConnect();
	const docs = await TextDocument.find({ createdBy: owner }).skip(skip).limit(limit).sort({
		lastModified: 'desc'
	});

	return docs.map((doc) => {
		return {
			id: doc._id.toString(),
			title: doc.title,
			createdAt: doc.createdAt,
			lastModified: doc.lastModified
		};
	});
}

export async function updateDocument(id: ObjectId | string, data) {
	await dbConnect();
	data.lastModified = new Date();
	console.log('updating with data: ', data);

	const doc = await TextDocument.findByIdAndUpdate(id, data, { new: true });
	return doc;
}

export async function getDocumentById(id: ObjectId, owner: ObjectId) {
	await dbConnect();
	const doc = await TextDocument.findById(id);
	if (doc?.createdBy.toString() === owner) {
		return doc;
	} else {
		return error(404, 'Invalid access');
	}
}
