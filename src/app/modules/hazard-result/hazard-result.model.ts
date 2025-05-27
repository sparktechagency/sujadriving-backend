import { model, Schema } from 'mongoose';
import { IHazardResult } from './hazard-result.interface';

const HazardResultSchema = new Schema<IHazardResult>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'NormalUser',
        required: true,
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: 'HazardVideo',
        required: true,
    },
    topic: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    rightSubmission: {
        type: Number,
        required: true,
    },
    wrongSubmission: {
        type: Number,
        required: true,
    },
    accuracy: {
        type: Number,
        required: true,
    },
    accuracyParcentage: {
        type: Number,
        required: true,
    },
    totalDangerZone: {
        type: [Number],
    },
});

const HazardResult = model<IHazardResult>('HazardResult', HazardResultSchema);

export default HazardResult;
