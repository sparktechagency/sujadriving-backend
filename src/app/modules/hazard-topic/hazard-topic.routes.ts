import express, { Request, Response, NextFunction } from 'express';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import HazardTopicValidations from './hazard-topic.validation';
import HazardTopicController from './hazard-topic.controller';
import { uploadFile } from '../../helper/mutler-s3-uploader';

const router = express.Router();

// Route to create a new HazardTopic
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
    validateRequest(HazardTopicValidations.createHazardTopicValidationSchema),
    HazardTopicController.createHazardTopic
);

// Route to update an existing HazardTopic by ID
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
    validateRequest(HazardTopicValidations.updateHazardTopicValidationSchema),
    HazardTopicController.updateHazardTopic
);

// Route to get all HazardTopics
router.get(
    '/get-all',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
    HazardTopicController.getAllHazardTopics
);

// Route to get a single HazardTopic by ID
router.get(
    '/get-single/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
    HazardTopicController.getHazardTopicById
);

// Route to delete a HazardTopic by ID
router.delete(
    '/delete/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    HazardTopicController.deleteHazardTopic
);

export const hazardTopicRoutes = router;
