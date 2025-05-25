import express, { Request, Response, NextFunction } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import hazardVideoValidations from './hazard-video.validation';
import hazardVideoController from './hazard-video.controller';
import { uploadFile } from '../../helper/mutler-s3-uploader';

const router = express.Router();

// Create Hazard Video
router.post(
    '/create',
    auth(USER_ROLE.admin),
    uploadFile(),
    (req: Request, res: Response, next: NextFunction) => {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }
        next();
    },
    validateRequest(hazardVideoValidations.createHazardVideoValidationSchema),
    hazardVideoController.createHazardVideo
);

// Get All Hazard Videos
router.get(
    '/get-all',
    auth(USER_ROLE.user),
    hazardVideoController.getAllHazardVideos
);

// Get Single Hazard Video
router.get(
    'get-single/:id',
    auth(USER_ROLE.user),
    hazardVideoController.getHazardVideoById
);

// Update Hazard Video
router.patch(
    'update/:id',
    auth(USER_ROLE.admin),
    uploadFile(),
    (req: Request, res: Response, next: NextFunction) => {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }
        next();
    },
    validateRequest(hazardVideoValidations.updateHazardVideoValidationSchema),
    hazardVideoController.updateHazardVideo
);

// Delete Hazard Video
router.delete(
    'delete/:id',
    auth(USER_ROLE.admin),
    hazardVideoController.deleteHazardVideo
);

export const hazardVideoRoutes = router;
