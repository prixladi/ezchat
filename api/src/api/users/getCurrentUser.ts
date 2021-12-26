import { CurrentUserDto } from '@api-models';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default (req: Request, res: Response<CurrentUserDto>) => {
  res.status(StatusCodes.OK).send({
    id: req.session.userId,
    username: req.session.username,
  });
};
