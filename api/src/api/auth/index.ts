import { Router } from 'express';
import passwordLogin from './passwordLogin';
import asyncHandler from 'express-async-handler';
import tokenLogin from './tokenLogin';

var router = Router();

router.post('/login/password', asyncHandler(passwordLogin));
router.post('/login/token', asyncHandler(tokenLogin));

export default router;
