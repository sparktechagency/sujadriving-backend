import mongoose, { Schema } from 'mongoose';
import { ISubscription } from './subscription.interface';

const subscriptionSchema: Schema = new Schema(
    {
        type: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
const Subscription = mongoose.model<ISubscription>(
    'Subscription',
    subscriptionSchema
);

export default Subscription;
