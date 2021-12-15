import { Request, Response } from 'express';
import userService from '../../services/user';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import { GetStatusByUsernameParams, UsernameStatusResponseDto } from '@api-models';

export default async (
  req: Request<GetStatusByUsernameParams>,
  res: Response<UsernameStatusResponseDto>,
) => {
  const valid = userService.validateUsername(req.params.username);
  const normalizedUsername = userService.normalizeUsernameOrEmail(req.params.username);

  const repo = getRepository(User);
  const count = await repo.count({ where: { normalizedUsername } });

  const resp = {
    used: count > 0,
    valid,
    username: req.params.username,
  } as UsernameStatusResponseDto;

  res.status(StatusCodes.OK).send(resp);
};