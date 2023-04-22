import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const { Schema } = mongoose;

export const userSch = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  image: { type: Date, default: Date.now },
  emailVerified: { type: ObjectId },
  theme: { type: String, default: 'light' }
});

export default mongoose.models['User'] || mongoose.model('User', userSch);
