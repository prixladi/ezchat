import * as R from 'ramda';
import React, { useContext, useReducer } from 'react';
import './App.css';

const enum AuthWallProgress {
  USERNAME_SELECTION,
  NEW_PASSWORD_SELECTION,
  PASSWORD_SELECTION,
  EMAIL_SELECTION,
  READY_TO_LOGIN,
  READY_TO_REGISTER,
  READY_TO_LOGIN_ANONYMOUS,
}

const enum AuthWallActionType {
  SELECT,
  AUTH,
}

type SelectAction = {
  type: AuthWallActionType.SELECT;
  progress: AuthWallProgress;
  payload: {
    username?: string | null;
    password?: string | null;
    email?: string | null;
  };
};

type AuthAction = {
  type: AuthWallActionType.AUTH;
};

type AuthWallAction = SelectAction | AuthAction;

type AuthWallContext = {
  username?: string | null;
  password?: string | null;
  email?: string | null;
  progress: AuthWallProgress;
};

const initialState = {
  progress: AuthWallProgress.USERNAME_SELECTION,
};

const AuthWallContext = React.createContext<AuthWallContext>(initialState);

const reducer = (state: AuthWallContext, action: AuthWallAction): AuthWallContext => {
  switch (action.type) {
    case AuthWallActionType.SELECT:
      return {
        ...state,
        ...action.payload,
        progress: R.defaultTo(action.progress, state.progress),
      };
    case AuthWallActionType.AUTH:
      return {
        progress: AuthWallProgress.USERNAME_SELECTION,
      };
    default:
      return state;
  }
};

const useAuthWallContextCreator = () => {
  const [dispatch] = useReducer(reducer, initialState);

  return [AuthWallContext, dispatch];
};

const useAuthWallContext = () => {
  return useContext(AuthWallContext);
};

export type { AuthWallActionType, AuthWallProgress, AuthWallAction };
export { useAuthWallContextCreator, useAuthWallContext };
