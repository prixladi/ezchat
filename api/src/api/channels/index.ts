import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import createChannel from './createChannel';
import getChannel from './getChannel';
import getCurrentChannels from './getCurrentChannels';

const router = Router();

router.post('/', asyncHandler(createChannel));
router.post('/current', asyncHandler(getCurrentChannels));
router.post('/:id', asyncHandler(getChannel));

export default router;
