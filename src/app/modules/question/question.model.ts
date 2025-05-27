import mongoose, { Schema } from 'mongoose';
import { IQuestion } from './question.interface';

const questionSchema: Schema = new Schema<IQuestion>(
    {
        topic: {
            type: Schema.Types.ObjectId,
            ref: 'Topic',
            required: true,
        },
        question: {
            type: String,
            required: true,
            trim: true,
        },
        question_image: {
            type: String,
            default: '',
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
        },
    },
    {
        timestamps: true,
    }
);

const Question = mongoose.model<IQuestion>('Question', questionSchema);

export default Question;
