import { Router } from 'express';
import auth from './auth';
import users from './users';

var router = Router();

router.use('/api/v1/users', users);
router.use('/api/v1/auth', auth);

export default router;
