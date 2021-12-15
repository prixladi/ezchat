import { PasswordLoginRequestDto } from '@api-models';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';

export default async (req: Request<{}, {}, PasswordLoginRequestDto>, res: Response) => {
  req.session.destroy(() => {});
  res.clearCookie(config.session.cookie, { path: '/' });
  res.sendStatus(StatusCodes.NO_CONTENT);
};
