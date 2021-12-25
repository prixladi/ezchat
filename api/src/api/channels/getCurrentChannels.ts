import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import { ChannelPreviewDto } from '@api-models';
import User from '../../entity/User';

export default async (req: Request, res: Response<ChannelPreviewDto[]>) => {
  const user = await getRepository(User).findOne({
    where: { id: req.session.userId },
    relations: ['channels', 'channels.channel'],
  });

  res.status(StatusCodes.OK).send(user.channels.map((x) => x.channel));
};
