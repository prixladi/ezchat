import { Request, Response } from 'express'
import userService from '../../services/user'
import { StatusCodes } from 'http-status-codes'
import { getRepository } from 'typeorm'
import { User } from '../../entity/User'
import { GetStatusByEmailParams, EmailStatusResponseDto } from '@api-models'

export default async (
  req: Request<GetStatusByEmailParams>,
  res: Response<EmailStatusResponseDto>
) => {
  const valid = userService.validateEmail(req.params.email)
  const normalizedEmail = userService.normalizeUsernameOrEmail(req.params.email)

  const repo = getRepository(User)
  const count = await repo.count({ where: { normalizedEmail } })

  const resp = {
    used: count > 0,
    valid,
    email: req.params.email
  } as EmailStatusResponseDto

  res.status(StatusCodes.OK).send(resp)
}
