import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import HazardResultService from './hazard-result.service';

const createHazardResultResult = catchAsync(async (req, res) => {
    const result = await HazardResultService.createHazardResultResult(
        req.user.profileId,
        req.body
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Hazard test result created successfully',
        data: result,
    });
});
const getAllHazardResultResult = catchAsync(async (req, res) => {
    const result = await HazardResultService.getAllHazardResultResult(
        req.query
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Hazard test result retrieved successfully',
        data: result,
    });
});
const getMyHazardResultResult = catchAsync(async (req, res) => {
    const result = await HazardResultService.getMyHazardResults(
        req.user.profileId,
        req.query
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Hazard test result retrieved successfully',
        data: result,
    });
});

const HazardResultController = {
    createHazardResultResult,
    getAllHazardResultResult,
    getMyHazardResultResult,
};

export default HazardResultController;
