import { model, Schema } from 'mongoose';
import { IHazardTest } from './hazard-test.interface';

const hazardTestSchema = new Schema<IHazardTest>({
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

const HazardTest = model<IHazardTest>('HazardTest', hazardTestSchema);

export default HazardTest;
