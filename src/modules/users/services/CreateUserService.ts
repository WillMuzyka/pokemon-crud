import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUser from '@modules/users/dtos/IUserDTO';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ nickname, email, password }: Omit<IUser, '_id'>): Promise<IUser> {
    const checkUserExists = await this.usersRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      nickname,
      email,
      password: hashedPassword,
    });
    return user;
  }
}
