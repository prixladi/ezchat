export type GetStatusByUserNameParams = {
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
