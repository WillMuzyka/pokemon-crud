import mongoose from 'mongoose';

interface IUser{
  _id: mongoose.Types.ObjectId;
  nickname: string;
  email: string;
  password: string;
}

export default IUser;
