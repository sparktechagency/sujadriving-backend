import mongoose, { Schema } from 'mongoose';
import { ISubscription } from './subscription.interface';
import { ENUM_SUBSCRIPTION_TYPE } from './subscription.enum';

const subscriptionSchema: Schema = new Schema<ISubscription>(
    {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: Object.values(ENUM_SUBSCRIPTION_TYPE),
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
