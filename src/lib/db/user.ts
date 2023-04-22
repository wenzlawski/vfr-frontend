import type { ObjectId } from 'mongoose';
import dbConnect from './mongoose';
import User from '$lib/models/user';

export async function updateUser(id: ObjectId | string, data) {
  dbConnect();
  console.log('updating with data: ', data);

  const user = await User.findByIdAndUpdate(id, data, { new: true });
  return user;
}

export async function getUser(id: ObjectId | string) {
  dbConnect();
  return await User.findById(id);
}
