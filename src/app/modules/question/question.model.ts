import mongoose, { Schema } from 'mongoose';
import { Types } from 'mongoose';
import { IQuestion } from './question.interface';

const questionSchema: Schema = new Schema(
    {
        topic: {
            type: Types.ObjectId,
            ref: 'Topic',
            required: true,
        },
        question: {
            type: String,
            required: true,
            trim: true,
        },
        options: {
            type: [String],
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        explanation: {
            type: String,
            // required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Question = mongoose.model<IQuestion>('Question', questionSchema);

export default Question;
