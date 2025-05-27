import express, { Request, Response, NextFunction } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import QuestionController from './question.controller';
import validateRequest from '../../middlewares/validateRequest';
import QuestionValidations from './question.validations';
import { uploadFile } from '../../helper/mutler-s3-uploader';

const router = express.Router();

// Create Question
router.post(
    '/create-question',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    uploadFile(),
    (req: Request, res: Response, next: NextFunction) => {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }
        next();
    },
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
    '/get-single/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
    QuestionController.getSingleQuestion
);

// Update Question
router.patch(
    '/update-question/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    uploadFile(),
    (req: Request, res: Response, next: NextFunction) => {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }
        next();
    },
    validateRequest(QuestionValidations.updateQuestionValidationSchema),
    QuestionController.updateQuestion
);

// Delete Question----
router.delete(
    '/delete-question/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    QuestionController.deleteQuestion
);

export const questionRoutes = router;
