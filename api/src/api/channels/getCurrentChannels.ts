import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import { ChannelPreviewDto } from '@api-models';
import User from '../../entity/User';

export default async (req: Request, res: Response<ChannelPreviewDto[]>) => {
  const repo = getRepository(User);

  const user = await repo.findOne({
    where: { id: req.session.userId },
    relations: ['channels', 'channels.channel'],
  });

  res.status(StatusCodes.CREATED).send(user.channels.map((x) => x.channel));
};
