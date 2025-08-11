/* eslint-disable @typescript-eslint/no-explicit-any */
import Question from '../question/question.model';
import { Result } from './result.model';

const submitQuiz = async (profileId: string, payload: any) => {
    const { topicId, answers } = payload;

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
    });

    return result;
};

const ResultServices = { submitQuiz };
export default ResultServices;
