import * as R from 'ramda'
import { useMemo } from 'react'
import { FormUtils } from '@lib/components/OneInputForm'
import {
  AuthWallActionType,
  AuthWallProgress,
  useAuthWallContext
} from '@lib/contexts/authWallContext'

const useNewPasswordPage = () => {
  const context = useAuthWallContext()
  const isCurrent = useMemo(
    () => context.state.progress === AuthWallProgress.NEW_PASSWORD_SELECTION,
    [context.state.progress]
  )

  const dispatchEmailSelection = (password: string) => {
    context.dispatch({
      type: AuthWallActionType.MOVE,
      progress: AuthWallProgress.EMAIL_SELECTION,
      payload: {
        password
      }
    })
  }

  const goToUsername = () => {
    context.dispatch({
      type: AuthWallActionType.MOVE,
      progress: AuthWallProgress.USERNAME_SELECTION,
      payload: {}
    })
  }

  const passwordSelected = async (password: string, { setError }: FormUtils) => {
    if (R.isNil(password) || R.isEmpty(password) || R.length(password) < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    dispatchEmailSelection(password)
  }

  return { context, passwordSelected, goToUsername, isCurrent }
}

export default useNewPasswordPage
