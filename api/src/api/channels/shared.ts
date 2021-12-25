import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import Channel from '../../entity/Channel';
import { createApiError } from '../utils';
import { Response } from 'express';
import R from 'ramda';

const getChannelOrThrow = async (id: string, res: Response): Promise<Channel> => {
  const channel = await getRepository(Channel).findOne({ where: { id } });

  if (R.isNil(channel)) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(createApiError(`Unable to find channel with id '${id}'.`));
    return;
  }
};

export { getChannelOrThrow };
