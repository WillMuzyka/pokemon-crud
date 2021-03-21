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

  public async findById(id: string): Promise<IUser | undefined> {
    const findUser = this.users.find((user) => JSON.stringify(user._id) === id);

    return findUser;
  }

  public async save(user: IUser): Promise<IUser> {
    const userIndex = this.users.findIndex((findUser) => user._id === findUser._id);
    this.users[userIndex] = user;

    return this.users[userIndex];
  }
}

export default UsersRepository;
