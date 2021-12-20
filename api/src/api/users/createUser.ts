import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import { CreateUserRequestDto, UserCreatedResponseDto } from '@api-models';
import R from 'ramda';
import User from '../../entity/User';
import userService from '../../services/user';
import { ApiError, createApiError } from '../utils';

export default async (
  req: Request<{}, {}, CreateUserRequestDto>,
  res: Response<UserCreatedResponseDto | ApiError>,
) => {
  const user = userService.createUser(req.body);

  const repo = getRepository(User);

  if (await repo.findOne({ where: { normalizedUsername: user.normalizedUsername } })) {
    res
      .status(StatusCodes.CONFLICT)
      .json(createApiError(`User with username '${req.body.username}' already exist`, 'username'));

    return;
  }

  if (
    R.isNil(user.normalizedEmail) &&
    (await repo.count({ where: { normalizedEmail: user.normalizedEmail } })) > 0
  ) {
    res
      .status(StatusCodes.CONFLICT)
      .json(createApiError(`User with email '${req.body.email}' already exist`, 'email'));

    return;
  }

  await repo.insert(user);

  const resp = {
    id: user.id,
  } as UserCreatedResponseDto;

  req.session.userId = resp.id;
  res.status(StatusCodes.CREATED).send(resp);
};
