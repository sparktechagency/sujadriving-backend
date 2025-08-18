import { ENUM_SUBSCRIPTION_TYPE } from './subscription.enum';

export interface ISubscription {
    title: string;
    type: (typeof ENUM_SUBSCRIPTION_TYPE)[keyof typeof ENUM_SUBSCRIPTION_TYPE];
    price: number;
    description: string;
}
