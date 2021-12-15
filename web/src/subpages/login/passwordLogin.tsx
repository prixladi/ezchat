import type { NextPage } from 'next'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import api from '../../api'
import OneInputForm, { FormUtils } from '../../components/OneInputForm'
import ThemeSwitch from '../../components/ThemeSwitch'
import { appName } from '../../constants'
import {
  AuthWallActionType,
  AuthWallProgress,
  useAuthWallContext
} from '../../contexts/authWallContext'

const PasswordLogin: NextPage = () => {
  const client = useQueryClient()
  const { state, dispatch } = useAuthWallContext()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (password: string, { setError, hideError }: FormUtils) => {
    if (isLoading) {
      return
    }

    hideError()
    setIsLoading(true)
    try {
      await client.executeMutation({
        mutationFn: async () =>
          await api.passwordLogin({ username: state.username!, password: password })
      })

      dispatch({
        type: AuthWallActionType.AUTH
      })
    } catch (err) {
      setError('Username or password is wrong.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const dispatchUsernameSelection = () => {
    dispatch({
      type: AuthWallActionType.FILL,
      progress: AuthWallProgress.USERNAME_SELECTION,
      payload: {}
    })
  }

  return (
    <div className="centered-content-md">
      <ThemeSwitch />
      <div className="centered-content-block">
        <h1>{appName} | Password</h1>
        <p>
          Enter password for user <b>&apos;{state.username}&apos;</b>.
        </p>
      </div>
      <OneInputForm
        isOpen={state.progress === AuthWallProgress.PASSWORD_SELECTION}
        type="password"
        autoComplete="current-password"
        placeholder="**************"
        aria-label="password"
        rightButtonContent="GO!"
        isLoading={isLoading}
        handleSubmit={onSubmit}
        additionalContent={
          <input
            value={state.username ?? 'default'}
            autoComplete="username"
            type="text"
            hidden
            readOnly
          />
        }
        footerContent={() => (
          <p>
            Or pick{' '}
            <a className="link" onClick={dispatchUsernameSelection}>
              different username
            </a>
          </p>
        )}
      />
    </div>
  )
}

export default PasswordLogin
