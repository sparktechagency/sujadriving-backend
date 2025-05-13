/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';

import { getCloudFrontUrl } from '../../helper/mutler-s3-uploader';
import SignTypeService from './sign-type.service';

// Create a new SignType
const createSignType = catchAsync(async (req, res) => {
    const file: any = req.files?.icon;
    if (req.files?.icon) {
        req.body.icon = getCloudFrontUrl(file[0].key);
    }
    const result = await SignTypeService.createSignType(req?.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Sign Type created successfully',
        data: result,
    });
});

// Update an existing SignType
const updateSignType = catchAsync(async (req, res) => {
    const file: any = req.files?.icon;
    if (req.files?.icon) {
        req.body.icon = getCloudFrontUrl(file[0].key);
    }
    const result = await SignTypeService.updateSignType(
        req.params.id,
        req.body
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Sign Type updated successfully',
        data: result,
    });
});

// Get all SignTypes
const getAllSignType = catchAsync(async (req, res) => {
    const result = await SignTypeService.getAllSignTypes(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Sign Types retrieved successfully',
        data: result,
    });
});

// Get a single SignType by ID
const getSignTypeById = catchAsync(async (req, res) => {
    const result = await SignTypeService.getSignTypeById(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Sign Type retrieved successfully',
        data: result,
    });
});

// Delete a SignType by ID
const deleteSignType = catchAsync(async (req, res) => {
    const result = await SignTypeService.deleteSignType(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.NO_CONTENT,
        success: true,
        message: 'Sign Type deleted successfully',
        data: result,
    });
});

const SignTypeController = {
    createSignType,
    updateSignType,
    getAllSignType,
    getSignTypeById,
    deleteSignType,
};

export default SignTypeController;
