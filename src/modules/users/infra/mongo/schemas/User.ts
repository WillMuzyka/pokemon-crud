import mongoose, { Schema, Document } from 'mongoose';
import IUser from '@modules/users/dtos/IUserDTO';

export interface IUserDocument extends Document, IUser {}

const UserSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUserDocument>('User', UserSchema);
