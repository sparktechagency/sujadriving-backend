import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import subscriptionValidations from './subscription.validation';
import subscriptionController from './subscription.controller';

const router = express.Router();

// Create
router.post(
    '/create',
    auth(USER_ROLE.admin),
    validateRequest(subscriptionValidations.createSubscriptionValidationSchema),
    subscriptionController.createSubscription
);

// Get
router.get(
    '/get-all',
    auth(USER_ROLE.user),
    subscriptionController.getAllSubscriptions
);

// Get Single
router.get(
    '/get-single/:id',
    auth(USER_ROLE.user),
    subscriptionController.getSubscriptionById
);

// Update
router.patch(
    '/update/:id',
    auth(USER_ROLE.admin),
    validateRequest(subscriptionValidations.updateSubscriptionValidationSchema),
    subscriptionController.updateSubscription
);

// Delete
router.delete(
    '/delete/:id',
    auth(USER_ROLE.admin),
    subscriptionController.deleteSubscription
);

export const subscriptionRoutes = router;
