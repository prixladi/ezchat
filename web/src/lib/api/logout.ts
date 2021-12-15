import client from './base'

const logout = async (): Promise<void> => {
  await client.post('api/v1/auth/logout')
}

export default logout
