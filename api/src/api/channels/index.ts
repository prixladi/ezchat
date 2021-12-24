import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import createChannel from './createChannel';
import getChannel from './getChannel';
import getCurrentChannels from './getCurrentChannels';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, asyncHandler(createChannel));
router.get('/current', authMiddleware, asyncHandler(getCurrentChannels));
router.get('/:id', authMiddleware, asyncHandler(getChannel));

export default router;
