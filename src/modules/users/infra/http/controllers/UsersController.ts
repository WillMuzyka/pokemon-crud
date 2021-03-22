import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { nickname, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);
    const newUser = await createUser.execute({ nickname, email, password });
    const { password: _, ...user } = newUser;

    return res.status(201).json({
      message: 'User created successfully',
      user,
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const {
      nickname, email, old_password, password,
    } = req.body;

    const updateUser = container.resolve(UpdateUserService);
    const updatedUser = await updateUser.execute({
      user_id,
      nickname,
      email,
      old_password,
      password,
    });

    const { password: _, ...user } = updatedUser;

    return res.json({
      message: 'User updated successfully',
      user,
    });
  }
}
