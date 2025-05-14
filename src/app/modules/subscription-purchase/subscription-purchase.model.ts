import { Schema, model } from 'mongoose';

const subscriptionPurchaseSchema = new Schema(
    {
        subscription: {
            type: Schema.Types.ObjectId,
            ref: 'Subscription',
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'NormalUser',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const SubscriptionPurchase = model(
    'SubscriptionPurchase',
    subscriptionPurchaseSchema
);

export default SubscriptionPurchase;
