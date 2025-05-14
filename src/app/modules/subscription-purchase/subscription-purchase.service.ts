import httpStatus from 'http-status';
import AppError from '../../error/appError';
import Subscription from '../subscription/subscription.model';
import { stripe } from '../../utilities/stripe';
import SubscriptionPurchase from './subscription-purchase.model';

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
        },
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    return { payemnt_url: session.url };
};

const SubscriptionPurchaseService = {
    purchaseSubscription,
};

export default SubscriptionPurchaseService;
