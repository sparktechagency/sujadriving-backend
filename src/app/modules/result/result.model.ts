import mongoose, { Schema } from 'mongoose';
import { IResult } from './result.interface';

const resultSchema = new Schema<IResult>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'NormalUser',
            required: true,
        },
        topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        totalQuestions: { type: Number, required: true },
        correctAnswers: { type: Number, required: true },
        wrongAnswers: { type: Number, required: true },
        accuracy: { type: Number, required: true },
        score: { type: Number, required: true },
        testType: { type: String, required: true },
    },
    { timestamps: true }
);

export const Result = mongoose.model<IResult>('Result', resultSchema);
