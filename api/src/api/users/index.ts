import { Router } from 'express';
import getStatusByUsername from './getStatusByUsername';
import asyncHandler from 'express-async-handler';
import createUserAnonymous from './createUserAnonymous';
import createUser from './createUser';

var router = Router();

router.get('/by-username/:username', asyncHandler(getStatusByUsername));
router.post('/anonymous', asyncHandler(createUserAnonymous));
router.post('/', asyncHandler(createUser));

export default router;
