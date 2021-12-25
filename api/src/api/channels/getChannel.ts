import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ChannelDeatailDto, ChannelIdParams } from '@api-models';
import { ApiError } from '../utils';
import { getChannelOrThrow } from './shared';

export default async (
  req: Request<ChannelIdParams>,
  res: Response<ChannelDeatailDto | ApiError>,
) => {
  const channel = await getChannelOrThrow(req.params.id, res);
  res.status(StatusCodes.CREATED).send(channel);
};
