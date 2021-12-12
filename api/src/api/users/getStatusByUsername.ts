import { Request, Response } from 'express';
import userService from '../../services/user';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import { GetStatusByUserNameParams } from '@api-models';

export default async (req: Request<GetStatusByUserNameParams>, res: Response) => {
  const valid = userService.validateUsername(req.params.username);
  const normalizedUsername = userService.normalizeUsernameOrEmail(req.params.username);

  const repo = getRepository(User);
  const count = await repo.count({ where: { normalizedUsername } });

  const resp = {
    used: count > 0,
    valid,
  };

  res.status(StatusCodes.OK).send(resp);
};
