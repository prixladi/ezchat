import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import checkChannel from './checkChannel';

const router = Router();

router.post('/check/:code', asyncHandler(checkChannel));
router.post('/:code/messages', asyncHandler(checkChannel));

export default router;
