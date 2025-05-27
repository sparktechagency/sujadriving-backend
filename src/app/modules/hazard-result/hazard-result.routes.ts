import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import HazardResultValidations from './hazard-result.validation';
import HazardResultController from './hazard-result.controller';

const router = express.Router();

router.post(
    '/create',
    auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.superAdmin),

    validateRequest(HazardResultValidations.HazardResultValidaitonSchema),
    HazardResultController.createHazardResultResult
);
router.get(
    '/get-all',
    auth(USER_ROLE.user, USER_ROLE.superAdmin, USER_ROLE.admin),
    HazardResultController.getAllHazardResultResult
);
router.get(
    '/my-results',
    auth(USER_ROLE.user, USER_ROLE.superAdmin, USER_ROLE.admin),
    HazardResultController.getMyHazardResultResult
);

export const hazardResultRoutes = router;
