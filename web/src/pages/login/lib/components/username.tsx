import type { NextPage } from 'next'
import OneInputForm from '@lib/components/OneInputForm'
import ThemeSwitch from '@lib/components/ThemeSwitch'
import { appName } from '../../../../lib/constants'
import useUsernamePage from '../hooks/useUsernamePage'

const Username: NextPage = () => {
  const { check, anonymousLogin, isLoading, isCurrent } = useUsernamePage()

  return (
    <>
      <div className="centered-content-md">
        <ThemeSwitch />
        <div className="centered-content-block">
          <h1>{appName} | Username</h1>
          <p>Choose new username or use your already existing account.</p>
        </div>
        <OneInputForm
          isOpen={isCurrent}
          type="text"
          autoComplete="username"
          placeholder="Username"
          aria-label="username"
          rightButtonContent="GO!"
          isLoading={isLoading}
          handleSubmit={check}
          footerContent={(utils) => (
            <p>
              Or start{' '}
              <a onClick={() => anonymousLogin(utils)} className="link">
                anonymous
              </a>
            </p>
          )}
        />
      </div>
    </>
  )
}

export default Username
