import { Types } from 'mongoose';

export interface IHazardResult {
    user: Types.ObjectId;
    video: Types.ObjectId;
    topic: Types.ObjectId;
    rightSubmission: number;
    wrongSubmission: number;
    accuracy: number;
    accuracyParcentage: number;
    totalDangerZone: number[];
}
