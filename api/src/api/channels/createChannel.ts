import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import { ChannelCreatedResponseDto, CreateChannelRequestDto } from '@api-models';
import { ApiError } from '../utils';
import Channel from '../../entity/Channel';
import ChannelUser from '../../entity/ChannelUser';

export default async (
  req: Request<{}, {}, CreateChannelRequestDto>,
  res: Response<ChannelCreatedResponseDto | ApiError>,
) => {
  const channel = new Channel();
  channel.name = req.body.name;
  channel.description = req.body.description;
  await getRepository(Channel).insert(channel);

  const channelUser = new ChannelUser();
  channelUser.userId = req.session.userId;
  channelUser.channelId = channel.id;
  await getRepository(ChannelUser).insert(channelUser);

  res.status(StatusCodes.CREATED).send({ id: channel.id });
};
