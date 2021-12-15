import { useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'
import api from '@lib/api'
import { FormUtils } from '@lib/components/OneInputForm'
import {
  AuthWallActionType,
  AuthWallProgress,
  useAuthWallContext
} from '@lib/contexts/authWallContext'

const usePasswordLoginPage = () => {
  const client = useQueryClient()
  const context = useAuthWallContext()
  const [isLoading, setIsLoading] = useState(false)
  const isCurrent = useMemo(
    () => context.state.progress === AuthWallProgress.PASSWORD_SELECTION,
    [context.state.progress]
  )

  const login = async (password: string, { setError, hideError }: FormUtils) => {
    if (isLoading) {
      return
    }

    hideError()
    setIsLoading(true)
    try {
      await client.executeMutation({
        mutationFn: async () =>
          await api.passwordLogin({
            username: context.state.payload?.username!,
            password: password
          })
      })

      context.dispatch({
        type: AuthWallActionType.AUTH
      })
    } catch (err) {
      setError('Username or password is wrong.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const usernameSelected = () => {
    context.dispatch({
      type: AuthWallActionType.MOVE,
      progress: AuthWallProgress.USERNAME_SELECTION,
      payload: {}
    })
  }

  return { context, login, usernameSelected, isLoading, isCurrent }
}

export default usePasswordLoginPage
