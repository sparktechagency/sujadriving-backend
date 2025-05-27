import { Types } from 'mongoose';
export interface IQuestion {
    topic: Types.ObjectId;
    question: string;
    question_image?: string;
    options: string[];
    answer: string;
    explanation: string;
}
