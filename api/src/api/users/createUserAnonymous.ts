import { Request, Response } from 'express';
import userService from '../../services/user';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import { AnonymousUserCreatedResponseDto } from '@api-models';

export default async (req: Request, res: Response<AnonymousUserCreatedResponseDto>) => {
  const user = userService.createAnonymousUser();

  const repo = getRepository(User);
  await repo.insert(user);

  const resp = {
    userId: user.id
  };

  req.session.userId = resp.userId;
  res.status(StatusCodes.CREATED).send(resp);
};
