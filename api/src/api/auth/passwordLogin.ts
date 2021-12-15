import { PasswordLoginRequestDto } from '@api-models'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getRepository } from 'typeorm'
import { User } from '../../entity/User'
import userService from '../../services/user'
import authService from '../../services/auth'

export default async (req: Request<{}, {}, PasswordLoginRequestDto>, res: Response) => {
  const normalizedUsername = userService.normalizeUsernameOrEmail(req.body.username)

  const repo = getRepository(User)
  const user = await repo.findOne({ where: { normalizedUsername } })

  const passwordMatch = authService.comparePasswords(req.body.password, {
    salt: user.passwordSalt,
    hash: user.passwordHash
  })

  if (!passwordMatch) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: {
        message: "Username-Password pair don't match"
      }
    })

    return
  }

  req.session.userId = user.id
  res.sendStatus(StatusCodes.NO_CONTENT)
}
