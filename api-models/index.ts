// Users

export type GetStatusByUsernameParams = {
  username: string;
};

export type GetStatusByEmailParams = {
  email: string;
};

export type CheckSessionResponseDto = {
  hasSession: boolean;
};

export type CurrentUserResponseDto = {
  id: string;
  username: string;
  email?: string | null;
  isAnonymous: boolean;
};

export type PasswordLoginRequestDto = {
  username: string;
  password: string;
};

export type TokenLoginRequestDto = {
  token: string;
};

export type CreateUserRequestDto = {
  username: string;
  password: string;
  email?: string | null;
};

export type AnonymousUserCreatedResponseDto = {
  id: string;
};

export type UserCreatedResponseDto = {
  id: string;
};

export type UsernameStatusResponseDto = {
  username: string;
  used: boolean;
  valid: boolean;
};

export type EmailStatusResponseDto = {
  email: string;
  used: boolean;
  valid: boolean;
};

// Channels

export type ChannelIdParams = {
  id: string;
};

export type CreateChannelRequestDto = {
  name: string;
  description?: string;
};

export type UpdateChannelRequestDto = {
  name: string;
  description?: string;
};

export type ChannelCreatedResponseDto = {
  id: string;
};

export type ChannelPreviewDto = {
  id: string;
  name: string;
};

export type CurrentChannelDto = {
  id: string;
  name: string;
};

export type ChannelDeatailDto = ChannelPreviewDto & {
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};
