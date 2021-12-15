import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import passwordLogin from './passwordLogin';
import tokenLogin from './tokenLogin';
import logout from './logout';
import checkSession from './checkSession';

const router = Router();

router.get('/check-session', asyncHandler(checkSession));
router.post('/login/password', asyncHandler(passwordLogin));
router.post('/login/token', asyncHandler(tokenLogin));
router.post('/logout', asyncHandler(logout));

export default router;
