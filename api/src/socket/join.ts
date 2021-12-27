import { Server, Socket } from 'socket.io';
import { getRepository } from 'typeorm';
import Channel from '../entity/Channel';
import User from '../entity/User';

type JoinChannelData = {
  channelCode: string;
};

export default (io: Server, socket: Socket, userId: string) => async (data: JoinChannelData) => {
  if ((await getRepository(Channel).count({ where: { code: data.channelCode } })) === 0) {
    throw new Error(`Unable to find channel with code '${data.channelCode}'.`);
  }

  socket.join(data.channelCode);

  const user = await getRepository(User).findOne({ where: { id: userId } });

  io.to(data.channelCode).emit('joined', { id: user.id, name: user.username });
};
