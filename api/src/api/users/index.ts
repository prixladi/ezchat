import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import createUser from './setUsername';
import getCurrentUser from './getCurrentUser';

const router = Router();

router.get('/current', asyncHandler(getCurrentUser));
router.put('/current/username', asyncHandler(createUser));

export default router;
