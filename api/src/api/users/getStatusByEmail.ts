import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import { GetStatusByEmailParams, EmailStatusResponseDto } from '@api-models';
import User from '../../entity/User';
import userService from '../../services/user';

export default async (
  req: Request<GetStatusByEmailParams>,
  res: Response<EmailStatusResponseDto>,
) => {
  const valid = userService.validateEmail(req.params.email);
  const normalizedEmail = userService.normalizeUsernameOrEmail(req.params.email);

  const count = await getRepository(User).count({ where: { normalizedEmail } });

  const resp = {
    used: count > 0,
    valid,
    email: req.params.email,
  } as EmailStatusResponseDto;

  res.status(StatusCodes.OK).send(resp);
};
