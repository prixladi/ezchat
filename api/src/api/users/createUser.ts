import { Request, Response } from 'express';
import userService from '../../services/user';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import { CreateUserRequestDto } from '@api-models';

export default async (req: Request<{}, CreateUserRequestDto>, res: Response) => {
  const user = userService.createUser(req.body);

  const repo = getRepository(User);
  await repo.insert(user);

  const resp = {
    id: user.id
  };

  res.status(StatusCodes.CREATED).send(resp);
};
