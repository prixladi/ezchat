import * as R from 'ramda'
import React, { Context, Dispatch, useContext, useReducer } from 'react'

const enum AuthWallProgress {
  BEGIN,
  USERNAME_SELECTION,
  NEW_PASSWORD_SELECTION,
  PASSWORD_SELECTION,
  EMAIL_SELECTION,
  AUTH
}

const enum AuthWallActionType {
  FILL,
  AUTH,
  CLEAR
}

type SelectAction = {
  type: AuthWallActionType.FILL
  progress: AuthWallProgress
  payload: {
    username?: string | null
    password?: string | null
    email?: string | null
  }
}

type AuthAction = {
  type: AuthWallActionType.AUTH | AuthWallActionType.CLEAR
}

type AuthWallAction = SelectAction | AuthAction

type AuthWallState = {
  username?: string | null
  password?: string | null
  email?: string | null
  progress: AuthWallProgress
}

type AuthWallContext = {
  state: AuthWallState
  dispatch: Dispatch<AuthWallAction>
}

const initialState = {
  progress: AuthWallProgress.BEGIN
}

const AuthWallContext = React.createContext<AuthWallContext>({
  state: initialState,
  dispatch: () => null
})

const reducer = (state: AuthWallState, action: AuthWallAction): AuthWallState => {
  switch (action.type) {
    case AuthWallActionType.FILL:
      return {
        ...state,
        ...action.payload,
        progress: R.defaultTo(state.progress, action.progress)
      }
    case AuthWallActionType.AUTH:
      return {
        progress: AuthWallProgress.AUTH
      }
    case AuthWallActionType.CLEAR:
      return {
        progress: AuthWallProgress.BEGIN
      }
    default:
      return state
  }
}

const useAuthWallContextCreator = (): [
  Context<AuthWallContext>,
  AuthWallState,
  Dispatch<AuthWallAction>
] => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return [AuthWallContext, state, dispatch]
}

const useAuthWallContext = () => {
  return useContext(AuthWallContext)
}

export { AuthWallActionType, AuthWallProgress }
export type { AuthWallAction }
export { useAuthWallContextCreator, useAuthWallContext }
