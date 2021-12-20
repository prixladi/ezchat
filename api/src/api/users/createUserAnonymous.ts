import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import { AnonymousUserCreatedResponseDto } from '@api-models';
import User from '../../entity/User';
import userService from '../../services/user';

export default async (req: Request, res: Response<AnonymousUserCreatedResponseDto>) => {
  const user = userService.createAnonymousUser();

  const repo = getRepository(User);
  await repo.insert(user);

  const resp = {
    id: user.id,
  } as AnonymousUserCreatedResponseDto;

  req.session.userId = resp.id;
  res.status(StatusCodes.CREATED).send(resp);
};
