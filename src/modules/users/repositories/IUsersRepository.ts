import IUser from '@modules/users/dtos/IUserDTO';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  save(userData: IUser): Promise<IUser>;
}

export default IUsersRepository;
