import { CheckSessionResponseDto } from '@api-models'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import R from 'ramda'

export default async (req: Request, res: Response<CheckSessionResponseDto>) => {
  res.status(StatusCodes.OK).send({
    hasSession: !R.isNil(req.session.userId)
  })
}
