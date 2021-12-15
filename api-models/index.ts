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
  userId: string;
};

export type UserCreatedResponseDto = {
  userId: string;
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
