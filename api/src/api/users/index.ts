import { Router } from 'express'
import getStatusByUsername from './getStatusByUsername'
import asyncHandler from 'express-async-handler'
import createUserAnonymous from './createUserAnonymous'
import createUser from './createUser'
import authMiddleware from '../middleware/authMiddleware'
import getCurrentUser from './getCurrentUser'
import getStatusByEmail from './getStatusByEmail'

const router = Router()

router.get('/by-username/:username', asyncHandler(getStatusByUsername))
router.get('/by-email/:email', asyncHandler(getStatusByEmail))
router.get('/current', authMiddleware, asyncHandler(getCurrentUser))

router.post('/anonymous', asyncHandler(createUserAnonymous))
router.post('/', asyncHandler(createUser))

export default router
