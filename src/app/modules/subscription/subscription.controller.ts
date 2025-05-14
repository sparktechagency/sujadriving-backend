/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import SubscriptionService from './subscription.service';

// Create
const createSubscription = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await SubscriptionService.createSubscription(payload);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Subscription created successfully',
        data: result,
    });
});

// Get all
const getAllSubscriptions = catchAsync(async (req, res) => {
    const result = await SubscriptionService.getAllSubscriptions(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subscriptions retrieved successfully',
        data: result,
    });
});

// Get a single
const getSubscriptionById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SubscriptionService.getSubscriptionById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subscription retrieved successfully',
        data: result,
    });
});

// Update
const updateSubscription = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await SubscriptionService.updateSubscription(id, payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subscription updated successfully',
        data: result,
    });
});

// Delete
const deleteSubscription = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SubscriptionService.deleteSubscription(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subscription deleted successfully',
        data: result,
    });
});

const SubscriptionController = {
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription,
};

export default SubscriptionController;
