import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const { Schema } = mongoose;

export const docSch = new Schema({
	title: { type: String, default: '' },
	content: { type: String, default: '' },
	createdAt: { type: Date, default: Date.now },
	createdBy: { type: ObjectId },
	tabSize: { type: Number, default: 0 }
});

export default mongoose.models['TextDocument'] || mongoose.model('TextDocument', docSch);
