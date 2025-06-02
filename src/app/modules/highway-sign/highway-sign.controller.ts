/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';

import { getCloudFrontUrl } from '../../helper/mutler-s3-uploader';
import HighwaySignService from './highway-sign.service';

// Create a new HighwaySign
const createHighwaySign = catchAsync(async (req, res) => {
    const file: any = req.files?.sign_image;
    if (req.files?.sign_image) {
        req.body.sign_image = getCloudFrontUrl(file[0].key);
    }
    const result = await HighwaySignService.createHighwaySign(req?.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Highway Sign created successfully',
        data: result,
    });
});

// Update an existing HighwaySign
const updateHighwaySign = catchAsync(async (req, res) => {
    const file: any = req.files?.sign_image;
    if (req.files?.sign_image) {
        req.body.sign_image = getCloudFrontUrl(file[0].key);
    }
    const result = await HighwaySignService.updateHighwaySign(
        req.params.id,
        req.body
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Highway Sign updated successfully',
        data: result,
    });
});

// Get all HighwaySigns
const getAllHighwaySigns = catchAsync(async (req, res) => {
    const result = await HighwaySignService.getAllHighwaySigns(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Highway Signs retrieved successfully',
        data: result,
    });
});

// Get a single HighwaySign by ID
const getHighwaySignById = catchAsync(async (req, res) => {
    const result = await HighwaySignService.getHighwaySignById(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Highway Sign retrieved successfully',
        data: result,
    });
});

// Delete a HighwaySign by ID
const deleteHighwaySign = catchAsync(async (req, res) => {
    const result = await HighwaySignService.deleteHighwaySign(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Highway Sign deleted successfully',
        data: result,
    });
});

const HighwaySignController = {
    createHighwaySign,
    updateHighwaySign,
    getAllHighwaySigns,
    getHighwaySignById,
    deleteHighwaySign,
};

export default HighwaySignController;
