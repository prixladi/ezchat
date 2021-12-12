import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';

export default (err: Error, _: Request, res: Response, __: NextFunction): Response => {
  console.log(err);

  if (config.api.includeErrorInResponse) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
  }

  return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
};
