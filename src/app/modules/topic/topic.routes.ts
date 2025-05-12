import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

import TopicController from './topic.controller';

const router = express.Router();

router.post(
    '/create-topic',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    TopicController.createTopic
);

export const topicRoutes = router;
