import express, { Request, Response, NextFunction } from 'express';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import SignTypeValidations from './sign-type.validation';
import SignTypeController from './sign-type.controller';
import { uploadFile } from '../../helper/mutler-s3-uploader';

const router = express.Router();

// Route to create a new SignType
router.post(
    '/create',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    uploadFile(),
    (req: Request, res: Response, next: NextFunction) => {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data); // Ensure proper body format
        }
        next();
    },
    validateRequest(SignTypeValidations.createSignTypeValidationSchema),
    SignTypeController.createSignType
);

// Route to update an existing SignType by ID
router.patch(
    '/update/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    uploadFile(),
    (req: Request, res: Response, next: NextFunction) => {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data); // Ensure proper body format
        }
        next();
    },
    validateRequest(SignTypeValidations.updateSignTypeValidationSchema),
    SignTypeController.updateSignType
);

// Route to get all SignTypes
router.get(
    '/get-all',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
    SignTypeController.getAllSignType
);

// Route to get a single SignType by ID
router.get(
    '/get-single/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
    SignTypeController.getSignTypeById
);

// Route to delete a SignType by ID
router.delete(
    '/delete/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    SignTypeController.deleteSignType
);

export const signTypeRoutes = router;
