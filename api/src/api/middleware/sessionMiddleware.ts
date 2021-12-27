import { NextFunction, Request, Response } from 'express';
import R from 'ramda';
import { getRepository } from 'typeorm';
import User from '../../entity/User';
import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req: Request, _: Response, next: NextFunction) => {
  if (R.isNil(req.session.userId)) {
    const user = new User();
    await getRepository(User).insert(user);

    req.session.userId = user.id;
  }

  return next();
});
