import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import { ChannelDto, CheckChannelParams } from '@api-models';
import Channel from '../../entity/Channel';
import R from 'ramda';
import channelService from '../../services/channel';
import { ApiError, createApiError } from '../utils';

export default async (req: Request<CheckChannelParams>, res: Response<ChannelDto | ApiError>) => {
  if (!channelService.validateCode(req.params.code)) {
    res.status(StatusCodes.BAD_REQUEST).send(createApiError('Code includes invalid characters'));
    return;
  }

  const repo = getRepository(Channel);

  let channel = await repo.findOne({ where: { code: req.params.code } });
  if (R.isNil(channel)) {
    channel = channelService.createChannel(req.params.code);
    await repo.insert(channel);
  }

  res.status(StatusCodes.OK).send({
    ...channel,
  });
};
