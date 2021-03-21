import mongoose, { Schema, Document } from 'mongoose';
import IUser from '@modules/users/dtos/IUserDTO';

type IUserDocument = IUser & Document

const UserSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
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
