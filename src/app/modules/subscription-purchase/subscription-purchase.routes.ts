import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import SubscriptionPurchaseController from './subscription-purchase.controller';
import SubscriptionPurchaseValidations from './subscription-purchase.validation';

const router = express.Router();

router.post(
    '/purchase/:id',
    auth(USER_ROLE.user),
    validateRequest(
        SubscriptionPurchaseValidations.subscriptionPurchaseValidationSchema
    ),
    SubscriptionPurchaseController.purchaseSubscription
);
router.get(
    '/get-all',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),

    SubscriptionPurchaseController.getAllSubscriptionPurchase
);

export const subscriptionPurchaseRoutes = router;
