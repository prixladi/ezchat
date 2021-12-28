import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import { GetChannelMesaggesParams, GetChannelMesaggesQuery, MessagesDto } from '@api-models';
import Channel from '../../entity/Channel';
import Message from '../../entity/Message';
import R from 'ramda';
import { ApiError, createApiError } from '../utils';

export default async (
  req: Request<GetChannelMesaggesParams, {}, {}, GetChannelMesaggesQuery>,
  res: Response<MessagesDto | ApiError>,
) => {
  let channel = await getRepository(Channel).findOne({
    where: { code: req.params.code },
  });

  if (req.query.pageSize < 1 || req.query.pageSize > 200) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(createApiError(`Page size must be number between 1 and 200`));
    return;
  }

  if (R.isNil(channel)) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(createApiError(`Channel with code '${req.params.code}' was not found`));
    return;
  }

  const total = await getRepository(Message).count({ where: { channelId: channel.id } });
  const data = await getRepository(Message).find({
    where: { channelId: channel.id },
    skip: req.query.pageSize * req.query.page,
    take: req.query.pageSize,
    order: { createdAt: 'DESC' },
    relations: ['user'],
  });

  res.status(StatusCodes.OK).send({
    total,
    page: req.query.page,
    pageSize: req.query.pageSize,
    data: R.map(
      (x) => ({
        id: x.id,
        channelCode: channel.code,
        content: x.content,
        createdAt: x.createdAt,
        user: {
          id: x.user.id,
          username: x.user.username,
        },
      }),
      data,
    ),
  });
};
