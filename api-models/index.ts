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
