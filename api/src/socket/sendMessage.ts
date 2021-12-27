import R from 'ramda';
import { Server, Socket } from 'socket.io';
import { getRepository } from 'typeorm';
import Channel from '../entity/Channel';
import Message from '../entity/Message';
import User from '../entity/User';

type CreateMessageData = {
  channelCode: string;
  content?: string;
};

export default (io: Server, socket: Socket, userId: string) => async (data: CreateMessageData) => {
  if (!R.any((x) => x === data.channelCode, Array.from(socket.rooms))) {
    throw new Error(
      `Unable to send message to channel with id '${data.channelCode}' because current user is not in that channel.`,
    );
  }

  const channel = await getRepository(Channel).findOne({ where: { code: data.channelCode } });

  const message = new Message();
  message.content = data.content;
  message.userId = userId;
  message.channelId = channel.id;

  await getRepository(Message).insert(message);
  const user = await getRepository(User).findOne({ where: { id: userId } });

  io.to(data.channelCode).emit('messageRecieved', {
    id: message.id,
    content: data.content,
    channelCode: data.channelCode,
    createdAt: message.createdAt,
    user: {
      id: user.id,
      username: user.username,
    },
  });
};
