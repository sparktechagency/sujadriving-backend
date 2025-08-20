import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import resultServices from './result.service';

const submitQuiz = catchAsync(async (req, res) => {
    const result = await resultServices.submitQuiz(
        req.user.profileId,
        req.body
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Quiz submitted successfully , This is your result',
        data: result,
    });
});
const getAllResult = catchAsync(async (req, res) => {
    const result = await resultServices.getAllResultFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All results retrieved successfully',
        data: result,
    });
});
const getMyResults = catchAsync(async (req, res) => {
    const result = await resultServices.getMyResultFromDB(
        req.user.profileId,
        req.query
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Your results retrieved successfully',
        data: result,
    });
});

const ResultController = { submitQuiz, getAllResult, getMyResults };
export default ResultController;
