import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import { ChannelDeatailDto, GetChannelParams } from '@api-models';
import R from 'ramda';
import { ApiError, createApiError } from '../utils';
import Channel from '../../entity/Channel';

export default async (
  req: Request<{}, {}, GetChannelParams>,
  res: Response<ChannelDeatailDto | ApiError>,
) => {
  const repo = getRepository(Channel);
  const channel = await repo.findOne({ where: { id: req.body.id } });

  if (R.isNil(channel)) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(createApiError(`Unable to find channel with id '${req.body.id}'.`));
    return;
  }

  res.status(StatusCodes.CREATED).send(channel);
};
