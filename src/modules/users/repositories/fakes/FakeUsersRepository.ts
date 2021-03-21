import { uuid } from 'uuidv4';

import IUser from '@modules/users/dtos/IUserDTO';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  public async create(userData: ICreateUserDTO): Promise<IUser> {
    const user = {} as IUser;

    Object.assign(
      user,
      {
        _id: uuid(),
        ...userData,
      },
    );

    this.users.push(user);
    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }
}

export default UsersRepository;
