import { Types } from 'mongoose';
export interface IQuestion {
    topic: Types.ObjectId;
    question: string;
    options: string[];
    answer: string;
    explanation: string;
}
