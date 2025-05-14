import { Types } from 'mongoose';
import { ENUM_PAYMENT_STATUS } from '../../utilities/enum';

export interface ISubscriptionPurchase {
    subscription: Types.ObjectId;
    user: Types.ObjectId;
    paymentStatus: (typeof ENUM_PAYMENT_STATUS)[keyof typeof ENUM_PAYMENT_STATUS];
}
