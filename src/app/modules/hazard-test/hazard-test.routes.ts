import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import HazardTestValidations from './hazard-test.validation';
import HazardTestController from './hazard-test.controller';

const router = express.Router();

router.patch(
    '/update-profile',
    auth(USER_ROLE.user),

    validateRequest(HazardTestValidations.hazardTestValidaitonSchema),
    HazardTestController.createHazardTestResult
);

export const hazardTestRoutes = router;
