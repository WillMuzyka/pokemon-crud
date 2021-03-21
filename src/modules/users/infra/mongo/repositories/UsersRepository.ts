import mongoose from 'mongoose';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUser from '@modules/users/dtos/IUserDTO';
import UserModel from '../schemas/User';

export default class UsersRepository implements IUsersRepository {
  public async create(userData: ICreateUserDTO): Promise<IUser> {
    const newUser = await UserModel.create({
      ...userData,
      _id: mongoose.Types.ObjectId(),
    }).catch((err) => {
      throw new AppError(`Error finding user: ${err}`);
    });
    return newUser.toObject();
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await UserModel.findOne({ email }).catch((err) => {
      throw new AppError(`Error finding user: ${err}`);
    });
    return user === null ? undefined : user.toObject();
  }
}
