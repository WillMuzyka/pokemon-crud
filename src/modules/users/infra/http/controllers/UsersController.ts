import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { nickname, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);
    const newUser = await createUser.execute({ nickname, email, password });
    // const { _doc: info } = newUser;
    console.log(newUser);
    const { password: _, ...user } = newUser;

    return res.json({
      message: 'User created successfully',
      user,
    });
  }
}
