/* eslint-disable @typescript-eslint/no-explicit-any */

import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/appError';
import Category from '../category/category.model';
import Question from '../question/question.model';
import { Topic } from '../topic/topic.model';
import { Result } from './result.model';
import httpStatus from 'http-status';

const submitQuiz = async (profileId: string, payload: any) => {
    const { topicId, answers } = payload;
    const topic = await Topic.findById(topicId);
    if (!topic) {
        throw new AppError(httpStatus.NOT_FOUND, 'Topic not found');
    }
    const category = await Category.findById(topic?.category);
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
    }

    // Fetch all questions for that topic
    const questions = await Question.find({ topic: topicId });

    let correct = 0;

    // Compare answers
    questions.forEach((q) => {
        const userAnswer = answers.find(
            (a: any) => String(a.questionId) === String(q._id)
        );
        if (userAnswer && userAnswer.selected === q.answer) {
            correct++;
        }
    });

    const total = questions.length;
    const wrong = total - correct;
    const score = correct;
    const accuracy = ((correct / total) * 100).toFixed(2);

    // Store result in DB
    const result = await Result.create({
        user: profileId,
        topic: topicId,
        totalQuestions: total,
        correctAnswers: correct,
        wrongAnswers: wrong,
        accuracy,
        score,
        category: topic.category,
        testType: category.testType,
    });

    return result;
};

const getAllResultFromDB = async (query: Record<string, unknown>) => {
    const resultQuery = new QueryBuilder(
        Result.find()
            .populate('user', 'name email')
            .populate('topic', 'name')
            .populate('category', 'name'),
        query
    )
        .search(['name'])
        .fields()
        .filter()
        .paginate()
        .sort();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    return {
        meta,
        result,
    };
};

const getMyResultFromDB = async (
    profileId: string,
    query: Record<string, unknown>
) => {
    const resultQuery = new QueryBuilder(
        Result.find({ user: profileId })
            .populate('user', 'name email')
            .populate('topic', 'name')
            .populate('category', 'name'),
        query
    )
        .search(['name'])
        .fields()
        .filter()
        .paginate()
        .sort();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    return {
        meta,
        result,
    };
};

const ResultServices = { submitQuiz, getAllResultFromDB, getMyResultFromDB };
export default ResultServices;
