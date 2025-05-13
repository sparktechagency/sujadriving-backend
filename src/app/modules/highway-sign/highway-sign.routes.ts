import express, { Request, Response, NextFunction } from 'express';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import HighwaySignValidations from './highway-sign.validation';
import HighwaySignController from './highway-sign.controller';
import { uploadFile } from '../../helper/mutler-s3-uploader';

const router = express.Router();

// Route to create a new HighwaySign
router.post(
    '/create',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    uploadFile(),
    (req: Request, res: Response, next: NextFunction) => {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }
        next();
    },
    validateRequest(HighwaySignValidations.createHighwaySignValidationSchema),
    HighwaySignController.createHighwaySign
);

// Route to update an existing HighwaySign by ID
router.patch(
    '/update/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    uploadFile(),
    (req: Request, res: Response, next: NextFunction) => {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }
        next();
    },
    validateRequest(HighwaySignValidations.updateHighwaySignValidationSchema),
    HighwaySignController.updateHighwaySign
);

// Route to get all HighwaySigns
router.get(
    '/get-all',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
    HighwaySignController.getAllHighwaySigns
);

// Route to get a single HighwaySign by ID
router.get(
    '/get-single/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
    HighwaySignController.getHighwaySignById
);

// Route to delete a HighwaySign by ID
router.delete(
    '/delete/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    HighwaySignController.deleteHighwaySign
);

export const highwaySignRoutes = router;
