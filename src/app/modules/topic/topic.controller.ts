import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import TopicServices from './topic.service';

const createTopic = catchAsync(async (req, res) => {
    const result = await TopicServices.createTopic(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile updated successfully',
        data: result,
    });
});

const TopicController = { createTopic };
export default TopicController;
