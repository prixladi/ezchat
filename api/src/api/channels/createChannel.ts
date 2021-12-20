import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import { ChannelCreatedResponseDto, CreateChannelRequestDto } from '@api-models';
import { ApiError } from '../utils';
import Channel from '../../entity/Channel';

export default async (
  req: Request<{}, {}, CreateChannelRequestDto>,
  res: Response<ChannelCreatedResponseDto | ApiError>,
) => {
  const repo = getRepository(Channel);

  const channel = new Channel();
  channel.name = req.body.name;
  channel.description = req.body.description;

  await repo.insert(channel);

  res.status(StatusCodes.CREATED).send({ id: channel.id });
};
