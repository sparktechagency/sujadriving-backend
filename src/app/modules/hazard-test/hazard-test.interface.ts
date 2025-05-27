import { Types } from 'mongoose';

export interface IHazardTest {
    user: Types.ObjectId;
    video: Types.ObjectId;
    rightSubmission: number;
    wrongSubmission: number;
    accuracy: number;
    accuracyParcentage: number;
}
