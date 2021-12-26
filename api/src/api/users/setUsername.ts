import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import { SetUsernameDto } from '@api-models';
import User from '../../entity/User';

export default async (req: Request<{}, {}, SetUsernameDto>, res: Response) => {
  await getRepository(User).update(
    {
      id: req.session.userId,
    },
    { username: req.body.username },
  );

  req.session.username = req.body.username;
  res.sendStatus(StatusCodes.NOT_FOUND);
};
