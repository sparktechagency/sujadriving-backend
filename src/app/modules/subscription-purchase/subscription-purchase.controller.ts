import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import SubscriptionPurchaseService from './subscription-purchase.service';

const purchaseSubscription = catchAsync(async (req, res) => {
    const result = await SubscriptionPurchaseService.purchaseSubscription(
        req.user.profileId,
        req.params.id
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payment url created for purchase subscription',
        data: result,
    });
});
const getAllSubscriptionPurchase = catchAsync(async (req, res) => {
    const result = await SubscriptionPurchaseService.getAllSubscriptionPurchase(
        req.query
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Purchased subscriptions retrieved successfully',
        data: result,
    });
});

const SubscriptionPurchaseController = {
    purchaseSubscription,
    getAllSubscriptionPurchase,
};
export default SubscriptionPurchaseController;
