import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { ISubscription } from './subscription.interface';
import Subscription from './subscription.model';
import QueryBuilder from '../../builder/QueryBuilder';

// Create
const createSubscription = async (payload: ISubscription) => {
    const result = await Subscription.create(payload);
    return result;
};

// Get all
const getAllSubscriptions = async (query: Record<string, unknown>) => {
    const subscriptionQuery = new QueryBuilder(Subscription.find(), query)
        .search(['type', 'description'])
        .fields()
        .filter()
        .paginate()
        .sort();

    const result = await subscriptionQuery.modelQuery;
    const meta = await subscriptionQuery.countTotal();

    return {
        meta,
        result,
    };
};

// Get a single
const getSubscriptionById = async (id: string) => {
    const result = await Subscription.findById(id);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Subscription not found');
    }
    return result;
};

// Update
const updateSubscription = async (
    id: string,
    payload: Partial<ISubscription>
) => {
    const subscription = await Subscription.findById(id);
    if (!subscription) {
        throw new AppError(httpStatus.NOT_FOUND, 'Subscription not found');
    }

    const result = await Subscription.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Subscription not found');
    }
    return result;
};

// Delete
const deleteSubscription = async (id: string) => {
    const result = await Subscription.findByIdAndDelete(id);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Subscription not found');
    }
    return result;
};

const SubscriptionService = {
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription,
};

export default SubscriptionService;
