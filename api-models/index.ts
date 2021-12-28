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

export type ChannelDto = {
  id: string;
  code: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
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
