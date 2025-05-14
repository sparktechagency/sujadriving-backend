import { Schema, model } from 'mongoose';
import { ENUM_PAYMENT_STATUS } from '../../utilities/enum';

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
        paymentStatus: {
            type: String,
            enum: Object.values(ENUM_PAYMENT_STATUS),
            default: ENUM_PAYMENT_STATUS.UNPAID,
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
