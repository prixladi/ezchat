import { TokenLoginRequestDto } from '@api-models';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import redisService from '../../services/redis';
import R from 'ramda';

export default async (req: Request<{}, {}, TokenLoginRequestDto>, res: Response) => {
  const oneOfToken = await redisService.getOneOffToken(req.body.token);

  if (R.isNil(oneOfToken)) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: {
        message: 'One off login token is invalid',
      },
    });
  }

  const repo = getRepository(User);
  const user = await repo.findOne({ where: { id: oneOfToken.userId } });

  req.session.userId = user.id;
  res.sendStatus(StatusCodes.NO_CONTENT);
};
