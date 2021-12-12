import { Router } from 'express';
import users from './users';

var router = Router();

router.use('/api/v1/users', users);

export default router;
