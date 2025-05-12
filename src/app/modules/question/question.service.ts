import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { Topic } from '../topic/topic.model';
import { IQuestion } from './question.interface';
import Question from './question.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createQuestion = async (payload: IQuestion) => {
    const topic = await Topic.findById(payload.topic);
    if (!topic) {
        throw new AppError(httpStatus.NOT_FOUND, 'Topic not found');
    }
    const result = await Question.create(payload);
    return result;
};

const getAllQuestions = async (query: Record<string, unknown>) => {
    const questionQuery = new QueryBuilder(Question.find(), query)
        .search(['name'])
        .fields()
        .filter()
        .paginate()
        .sort();

    const result = await questionQuery.modelQuery;
    const meta = await questionQuery.countTotal();
    return {
        meta,
        result,
    };
};

const getSingleQuestion = async (id: string) => {
    const question = await Question.findById(id).populate('topic');
    if (!question) {
        throw new AppError(httpStatus.NOT_FOUND, 'Question not found');
    }
    return question;
};

const updateQuestion = async (id: string, payload: IQuestion) => {
    if (payload.topic) {
        const topic = await Topic.findById(payload.topic);
        if (!topic) {
            throw new AppError(httpStatus.NOT_FOUND, 'Topic not found');
        }
    }
    const updatedQuestion = await Question.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!updatedQuestion) {
        throw new AppError(httpStatus.NOT_FOUND, 'Question not found');
    }
    return updatedQuestion;
};

const deleteQuestion = async (id: string) => {
    const question = await Question.findByIdAndDelete(id);
    if (!question) {
        throw new AppError(httpStatus.NOT_FOUND, 'Question not found');
    }
    return question;
};

const QuestionService = {
    createQuestion,
    getAllQuestions,
    getSingleQuestion,
    updateQuestion,
    deleteQuestion,
};

export default QuestionService;
