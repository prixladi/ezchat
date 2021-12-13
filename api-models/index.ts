export type GetStatusByUsernameParams = {
  username: string;
};

export type CreateUserRequestDto = {
  username: string;
  password: string;
  email: string;
};

export type AnonymousUserCreatedResponseDto = {
  userId: string;
  loginToken: string;
};

export type UserCreatedResponseDto = {
  userId: string;
};

export type UsernameStatusResponseDto = {
  username: string;
  used: boolean;
  valid: boolean;
};
