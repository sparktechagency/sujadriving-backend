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
        message: 'Profile updated successfully',
        data: result,
    });
});

const SubscriptionPurchaseController = { purchaseSubscription };
export default SubscriptionPurchaseController;
