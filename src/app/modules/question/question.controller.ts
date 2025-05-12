import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import QuestionService from './question.service';

// Create Question
const createQuestion = catchAsync(async (req, res) => {
    const result = await QuestionService.createQuestion(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Question created successfully',
        data: result,
    });
});

// Get All Questions
const getAllQuestions = catchAsync(async (req, res) => {
    const result = await QuestionService.getAllQuestions(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Questions retrieved successfully',
        data: result,
    });
});

// Get Single Question
const getSingleQuestion = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await QuestionService.getSingleQuestion(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Question retrieved successfully',
        data: result,
    });
});

// Update Question
const updateQuestion = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await QuestionService.updateQuestion(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Question updated successfully',
        data: result,
    });
});

// Delete Question
const deleteQuestion = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await QuestionService.deleteQuestion(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Question deleted successfully',
        data: result,
    });
});

const QuestionController = {
    createQuestion,
    getAllQuestions,
    getSingleQuestion,
    updateQuestion,
    deleteQuestion,
};

export default QuestionController;
