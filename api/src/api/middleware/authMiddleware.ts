import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import R from 'ramda';

export default (req: Request, res: Response, next: NextFunction) => {
  if (R.isNil(req.session.userId)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ error: { message: 'User id is missing in current session.' } });
  }

  return next();
};
