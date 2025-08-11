import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import resultController from './result.controller';
import validateRequest from '../../middlewares/validateRequest';
import ResultValidations from './result.validation';

const router = express.Router();

router.post(
    '/submit-quiz',
    auth(USER_ROLE.user),
    validateRequest(ResultValidations.quizSubmissionSchema),
    resultController.submitQuiz
);

export const resultRoutes = router;
