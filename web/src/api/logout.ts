import client from './base'

export default async (): Promise<void> => {
  await client.post('api/v1/auth/logout')
}
