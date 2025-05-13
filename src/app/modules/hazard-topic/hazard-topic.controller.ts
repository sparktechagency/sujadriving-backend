/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';

import { getCloudFrontUrl } from '../../helper/mutler-s3-uploader';
import HazardTopicService from './hazard-topic.service';

// Create a new HazardTopic
const createHazardTopic = catchAsync(async (req, res) => {
    const file: any = req.files?.topic_icon;
    if (req.files?.topic_icon) {
        req.body.topic_icon = getCloudFrontUrl(file[0].key);
    }
    const result = await HazardTopicService.createHazardTopic(req?.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Hazard Topic created successfully',
        data: result,
    });
});

// Update an existing HazardTopic
const updateHazardTopic = catchAsync(async (req, res) => {
    const file: any = req.files?.topic_icon;
    if (req.files?.topic_icon) {
        req.body.topic_icon = getCloudFrontUrl(file[0].key);
    }
    const result = await HazardTopicService.updateHazardTopic(
        req.params.id,
        req.body
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Hazard Topic updated successfully',
        data: result,
    });
});

// Get all HazardTopics
const getAllHazardTopics = catchAsync(async (req, res) => {
    const result = await HazardTopicService.getAllHazardTopics(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Hazard Topics retrieved successfully',
        data: result,
    });
});

// Get a single HazardTopic by ID
const getHazardTopicById = catchAsync(async (req, res) => {
    const result = await HazardTopicService.getHazardTopicById(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Hazard Topic retrieved successfully',
        data: result,
    });
});

// Delete a HazardTopic by ID
const deleteHazardTopic = catchAsync(async (req, res) => {
    const result = await HazardTopicService.deleteHazardTopic(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.NO_CONTENT,
        success: true,
        message: 'Hazard Topic deleted successfully',
        data: result,
    });
});

const HazardTopicController = {
    createHazardTopic,
    updateHazardTopic,
    getAllHazardTopics,
    getHazardTopicById,
    deleteHazardTopic,
};

export default HazardTopicController;
