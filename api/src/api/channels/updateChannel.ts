import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ChannelIdParams, UpdateChannelRequestDto } from '@api-models';
import { ApiError } from '../utils';
import { getChannelOrThrow } from './shared';

export default async (
  req: Request<ChannelIdParams, {}, UpdateChannelRequestDto>,
  res: Response<ApiError>,
) => {
  const channel = await getChannelOrThrow(req.params.id, res);

  channel.name = req.body.name;
  channel.description = req.body.description;

  res.sendStatus(StatusCodes.NO_CONTENT);
};
