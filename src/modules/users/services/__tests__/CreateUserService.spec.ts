import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      nickname: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123',
    });

    expect(user).toHaveProperty('_id');
    expect(user.nickname).toBe('John Doe');
  });

  it('should not be able to create two users with the same email ', async () => {
    await createUser.execute({
      nickname: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123',
    });

    await expect(
      createUser.execute({
        nickname: 'John Doe',
        email: 'jhon@doe.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
