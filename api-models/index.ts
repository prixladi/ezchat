export type CurrentUserDto = {
  id: string;
  username?: string;
};

export type SetUsernameDto = {
  username?: string;
};

export type CheckChannelParams = {
  code: string;
};

export type GetChannelMesaggesParams = {
  code: string;
};

export type GetChannelMesaggesQuery = {
  page: number;
  pageSize: number;
};

export type ChannelDto = {
  id: string;
  code: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MessagesDto = {
  data: MessageRecievedData[];
  total: number;
  page: number;
  pageSize: number;
};

// socket

export type CreateMessageData = {
  channelCode: string;
  content?: string;
};

export type MessageRecievedData = {
  id: string;
  content?: string;
  channelCode: string;
  createdAt: Date;
  user: {
    id: string;
    username: string;
  };
};
