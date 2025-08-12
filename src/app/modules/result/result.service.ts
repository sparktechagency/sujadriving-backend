/* eslint-disable @typescript-eslint/no-explicit-any */

import AppError from '../../error/appError';
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
    });

    return result;
};

const ResultServices = { submitQuiz };
export default ResultServices;
