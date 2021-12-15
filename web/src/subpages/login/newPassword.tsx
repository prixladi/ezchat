import type { NextPage } from 'next'
import * as R from 'ramda'
import OneInputForm, { FormUtils } from '../../components/OneInputForm'
import ThemeSwitch from '../../components/ThemeSwitch'
import { appName } from '../../constants'
import {
  AuthWallActionType,
  AuthWallProgress,
  useAuthWallContext
} from '../../contexts/authWallContext'

const NewPassword: NextPage = () => {
  const { state, dispatch } = useAuthWallContext()

  const dispatchEmailSelection = (password: string) => {
    dispatch({
      type: AuthWallActionType.FILL,
      progress: AuthWallProgress.EMAIL_SELECTION,
      payload: {
        password
      }
    })
  }

  const dispatchUsernameSelection = () => {
    dispatch({
      type: AuthWallActionType.FILL,
      progress: AuthWallProgress.USERNAME_SELECTION,
      payload: {}
    })
  }

  const onSubmit = async (password: string, { setError }: FormUtils) => {
    if (R.isNil(password) || R.isEmpty(password) || R.length(password) < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    dispatchEmailSelection(password)
  }

  return (
    <div className="centered-content-md">
      <ThemeSwitch />
      <div className="centered-content-block">
        <h1>{appName} | New Password</h1>
        <p>
          Choose new password for user <b>&apos;{state.username}&apos;</b>.
        </p>
      </div>
      <OneInputForm
        isOpen={state.progress === AuthWallProgress.NEW_PASSWORD_SELECTION}
        type="password"
        autoComplete="new-password"
        placeholder="**************"
        aria-label="new-password"
        rightButtonContent="GO!"
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

export default NewPassword
