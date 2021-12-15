import { CurrentUserResponseDto } from '@api-models'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getRepository } from 'typeorm'
import { User } from '../../entity/User'

export default async (req: Request, res: Response<CurrentUserResponseDto>) => {
  const repo = getRepository(User)
  const user = await repo.findOne({ where: { id: req.session.userId } })

  res.status(StatusCodes.OK).send({
    id: user.id,
    email: user.email,
    username: user.username,
    isAnonymous: user.isAnonymous
  })
}
