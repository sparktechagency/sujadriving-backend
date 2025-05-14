import { Types } from 'mongoose';

export interface ISubscriptionPurchase {
    subscription: Types.ObjectId;
    user: Types.ObjectId;
}
