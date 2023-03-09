import dbConnect from './mongoose';
import TextDocument from '$lib/models/document';
// import { error } from '@sveltejs/kit';
import type { ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';

export async function insertDocument(createdBy: ObjectId) {
	await dbConnect();
	const doc = new TextDocument({
		createdBy
	});
	doc.save();
	return doc;
}

export async function getDocumentIds(owner: ObjectId, limit = 10, skip = 0) {
	await dbConnect();
	const docs = await TextDocument.find({ createdBy: owner }).skip(skip).limit(limit).sort({
		createdAt: 'asc'
	});

	return docs.map((doc) => {
		return {
			id: doc._id.toString(),
			title: doc.title,
			content: doc.content,
			createdAt: doc.createdAt
		};
	});

	// const docs = await TextDocument.find({ createdBy: owner }).select('_id').limit(limit).skip(skip);
	return docs.map((doc) => doc._id);
}

export async function getAllDocuments(owner: ObjectId) {
	await dbConnect();
	const docs = await TextDocument.find({ createdBy: owner });
	return docs;
}

export async function getDocumentById(id: ObjectId, owner: ObjectId) {
	await dbConnect();
	const doc = await TextDocument.findById(id);
	if (doc?.createdBy === owner) {
		return doc;
	} else {
		return error(404, 'Invalid access');
	}
}
