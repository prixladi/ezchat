import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import { logger } from '../../logging';

// eslint-disable-next-line
export default (err: Error, _: Request, res: Response, __: NextFunction): Response => {
  logger.error(err);

  if (config.api.includeErrorTraceInResponse) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
  }

  return res
    .sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: { message: err.message } });
};
