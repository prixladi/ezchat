import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import setUsername from './setUsername';
import getCurrentUser from './getCurrentUser';

const router = Router();

router.get('/current', asyncHandler(getCurrentUser));
router.put('/current/username', asyncHandler(setUsername));

export default router;
