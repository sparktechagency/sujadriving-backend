/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import httpStatus from 'http-status';
import AppError from '../error/appError';
import {
    ENUM_NOTIFICATION_TYPE,
    ENUM_PAYMENT_PURPOSE,
    ENUM_PAYMENT_STATUS,
    ENUM_TRANSACTION_TYPE,
} from '../utilities/enum';
import Transaction from '../modules/transaction/transaction.model';

import sendNotification from '../helper/sendNotification';
import SubscriptionPurchase from '../modules/subscription-purchase/subscription-purchase.model';

const handlePaymentSuccess = async (
    metaData: any,
    transactionId: string,
    amount: number
) => {
    if (metaData.paymentPurpose == ENUM_PAYMENT_PURPOSE.PURCHASE_SUBSCRIPTION) {
        await handlePurchaseSubscription(
            metaData.userId,
            metaData.coursePurchaseId,
            transactionId,
            amount
        );
    }
};

const handlePurchaseSubscription = async (
    userId: string,
    subscriptionPurchaseId: string,
    transactionId: string,
    amount: number
) => {
    const purchaseSubscription = await SubscriptionPurchase.findById(
        subscriptionPurchaseId
    );
    if (!purchaseSubscription) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Purchased subscription not found'
        );
    }

    await SubscriptionPurchase.findByIdAndUpdate(subscriptionPurchaseId, {
        paymentStatus: ENUM_PAYMENT_STATUS.PAID,
    });

    await Transaction.create({
        user: userId,
        type: ENUM_TRANSACTION_TYPE.PURCHASE_SUBSCRIPTION,
        amount,
        transactionId,
    });

    const notificationData = {
        title: 'Payment successfull for subscription purchase',
        message: `Your payment is successfull for subscription purchase . Thank you for purchasing`,
        receiver: userId.toString(),
        type: ENUM_NOTIFICATION_TYPE.PAYMENT,
    };

    sendNotification(notificationData);
};

export default handlePaymentSuccess;
