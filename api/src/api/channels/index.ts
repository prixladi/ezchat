import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import checkChannel from './checkChannel';
import getChannelMessages from './getChannelMessages';

const router = Router();

router.post('/check/:code', asyncHandler(checkChannel));
router.get('/:code/messages', asyncHandler(getChannelMessages));

export default router;
