import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import QuestionController from './question.controller';
import validateRequest from '../../middlewares/validateRequest';
import QuestionValidations from './question.validations';

const router = express.Router();

// Create Question
router.post(
    '/create-question',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(QuestionValidations.createQuestionValidationSchema),
    QuestionController.createQuestion
);

// Get All Questions
router.get(
    '/get-all-question',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
    QuestionController.getAllQuestions
);

// Get Single Question by ID
router.get(
    'get-single/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
    QuestionController.getSingleQuestion
);

// Update Question
router.put(
    'update-question/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(QuestionValidations.updateQuestionValidationSchema),
    QuestionController.updateQuestion
);

// Delete Question----
router.delete(
    'delete-question/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    QuestionController.deleteQuestion
);

export const questionRoutes = router;
