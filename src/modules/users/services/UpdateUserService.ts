import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';
import IUser from '../dtos/IUserDTO';

interface IRequest {
  user_id: string;
  nickname: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    nickname,
    email,
    password,
    old_password,
  }: IRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError('User not found');

    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    const sameUser = JSON.stringify(userWithSameEmail?._id) === JSON.stringify(user._id);
    if (userWithSameEmail && !sameUser) {
      throw new AppError('Email already being used by other user');
    }

    user.nickname = nickname;
    user.email = email;
    if (password) {
      if (!old_password) throw new AppError('Need to inform your old password');

      const matchOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );
      if (!matchOldPassword) throw new AppError('Old password does not match');

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}
