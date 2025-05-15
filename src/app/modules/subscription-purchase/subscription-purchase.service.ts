/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../error/appError';
import Subscription from '../subscription/subscription.model';
import { stripe } from '../../utilities/stripe';
import SubscriptionPurchase from './subscription-purchase.model';
import { ENUM_PAYMENT_PURPOSE } from '../../utilities/enum';

const purchaseSubscription = async (userId: string, subscriptionId: string) => {
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
        throw new AppError(httpStatus.NOT_FOUND, 'Subscription not found');
    }

    const subscriptionPurchase = await SubscriptionPurchase.create({
        user: userId,
        subscription: subscriptionId,
    });

    const amount = subscription.price * 100;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: subscription.type,
                        description: subscription.description,
                    },
                    unit_amount: amount,
                },
                quantity: 1,
            },
        ],
        metadata: {
            userId,
            subscriptionPurchaseId: subscriptionPurchase._id.toString(),
            paymentPurpose: ENUM_PAYMENT_PURPOSE.PURCHASE_SUBSCRIPTION,
        },
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    return { payemnt_url: session.url };
};

const getAllSubscriptionPurchase = async (query: {
    subscriptionType?: string;
    userName?: string;
    page?: number;
    limit?: number;
}) => {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const pipeline: any[] = [
        // Lookup Subscription
        {
            $lookup: {
                from: 'subscriptions',
                localField: 'subscription',
                foreignField: '_id',
                as: 'subscription',
            },
        },
        { $unwind: '$subscription' },

        // Lookup NormalUser
        {
            $lookup: {
                from: 'normalusers',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
            },
        },
        { $unwind: '$user' },
    ];

    // Filter by subscriptionType
    if (query.subscriptionType) {
        pipeline.push({
            $match: {
                'subscription.type': query.subscriptionType,
            },
        });
    }

    // Filter by userName (case-insensitive regex)
    if (query.userName) {
        pipeline.push({
            $match: {
                'user.name': { $regex: query.userName, $options: 'i' },
            },
        });
    }

    // Count total matching documents pipeline
    const countPipeline = [...pipeline, { $count: 'total' }];
    const countResult = await SubscriptionPurchase.aggregate(countPipeline);
    const total = countResult.length > 0 ? countResult[0].total : 0;
    const totalPage = Math.ceil(total / limit);

    // Add pagination stages
    pipeline.push({ $skip: skip }, { $limit: limit });

    // Optional: project only needed fields to reduce payload size
    pipeline.push({
        $project: {
            _id: 1,
            paymentStatus: 1,
            createdAt: 1,
            updatedAt: 1,
            'subscription._id': 1,
            'subscription.type': 1,
            'subscription.price': 1,
            'subscription.description': 1,
            'user._id': 1,
            'user.name': 1,
            'user.email': 1,
            'user.phone': 1,
        },
    });

    const data = await SubscriptionPurchase.aggregate(pipeline);

    return {
        data,
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
    };
};

const SubscriptionPurchaseService = {
    purchaseSubscription,
    getAllSubscriptionPurchase,
};

export default SubscriptionPurchaseService;
