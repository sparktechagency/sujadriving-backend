/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import HazardVideoService from './hazard-video.service';
import { getCloudFrontUrl } from '../../helper/mutler-s3-uploader';

// Create a new HazardVideo
const createHazardVideo = catchAsync(async (req, res) => {
    const file: any = req.files?.video;
    if (req.files?.video) {
        req.body.video_url = getCloudFrontUrl(file[0].key);
    }
    if (req.files?.thumbnail) {
        const thumbnail: any = req.files.thumbnail;
        req.body.thumbnail_url = getCloudFrontUrl(thumbnail[0].key);
    }
    const result = await HazardVideoService.createHazardVideo(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Hazard video created successfully',
        data: result,
    });
});

// Get all HazardVideos
const getAllHazardVideos = catchAsync(async (req, res) => {
    const result = await HazardVideoService.getAllHazardVideos(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Hazard videos retrieved successfully',
        data: result,
    });
});

// Get a single HazardVideo by ID
const getHazardVideoById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await HazardVideoService.getHazardVideoById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Hazard video retrieved successfully',
        data: result,
    });
});

// Update a HazardVideo by ID
const updateHazardVideo = catchAsync(async (req, res) => {
    const { id } = req.params;
    const file: any = req.files?.video;
    if (req.files?.video) {
        req.body.video_url = getCloudFrontUrl(file[0].key);
    }
    const result = await HazardVideoService.updateHazardVideo(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Hazard video updated successfully',
        data: result,
    });
});

// Delete a HazardVideo by ID
const deleteHazardVideo = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await HazardVideoService.deleteHazardVideo(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Hazard video updated successfully',
        data: result,
    });
});

const HazardVideoController = {
    createHazardVideo,
    getAllHazardVideos,
    getHazardVideoById,
    updateHazardVideo,
    deleteHazardVideo,
};

export default HazardVideoController;
