import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import api from '../api'
import { routes } from '../constants'
import { AuthWallActionType, useAuthWallContext } from '../contexts/authWallContext'

export default () => {
  const { dispatch } = useAuthWallContext()
  const router = useRouter()
  const { mutateAsync } = useMutation(api.logout)

  return async () => {
    try {
      await mutateAsync()
    } catch (err) {
      console.error(err)
    }

    dispatch({
      type: AuthWallActionType.CLEAR
    })

    router.push(routes.login)
  }
}
