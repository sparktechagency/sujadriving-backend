import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import HazardTestService from './hazard-test.service';

const createHazardTestResult = catchAsync(async (req, res) => {
    const result = await HazardTestService.createHazardTestResult(
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

const HazardTestController = {
    createHazardTestResult,
};

export default HazardTestController;
