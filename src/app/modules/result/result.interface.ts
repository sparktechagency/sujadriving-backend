import { Types } from 'mongoose';

export interface IResult {
    user: Types.ObjectId;
    topic: Types.ObjectId;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    accuracy: number;
    score: number;
}
