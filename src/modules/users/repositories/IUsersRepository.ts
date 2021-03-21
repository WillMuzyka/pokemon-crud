import IUser from '@modules/users/dtos/IUserDTO';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | undefined>;
}

export default IUsersRepository;
