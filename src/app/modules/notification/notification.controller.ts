import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import notificationService from './notification.services';

const getAllNotification = catchAsync(async (req, res) => {
    const result = await notificationService.getAllNotificationFromDB(
        req?.query,
        req?.user
    );

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Notification retrieved successfully',
        data: result,
    });
});

const seeNotification = catchAsync(async (req, res) => {
    const result = await notificationService.seeNotification(req?.user);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Notification seen successfully',
        data: result,
    });
});

const deleteNotification = catchAsync(async (req, res) => {
    const result = await notificationService.deleteNotification(
        req.params.id,
        req.user.profileId
    );
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Notification removed',
        data: result,
    });
});

const notificationController = {
    getAllNotification,
    seeNotification,
    deleteNotification,
};

export default notificationController;
