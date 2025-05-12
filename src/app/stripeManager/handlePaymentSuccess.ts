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
import Notification from '../modules/notification/notification.model';
import { getIO } from '../socket/socket';
import getUserNotificationCount from '../helper/getUserNotificationCount';
import Order from '../modules/order/order.model';
import PurchaseCourse from '../modules/purchase-course/purchase-course.model';
import { ICourse } from '../modules/course/course.interface';
import { INormalUser } from '../modules/normalUser/normalUser.interface';
import PackagePurchase from '../modules/package-purchase/package-purchase.model';
import sendNotification from '../helper/sendNotification';

const handlePaymentSuccess = async (
    metaData: any,
    transactionId: string,
    amount: number
) => {
    if (metaData.paymentPurpose == ENUM_PAYMENT_PURPOSE.PURCHASE_COURSE) {
        await handleCoursePurchasePaymentSuccess(
            metaData.coursePurchaseId,
            transactionId,
            amount
        );
    } else if (
        metaData.paymentPurpose == ENUM_PAYMENT_PURPOSE.PURCHASE_PRODUCT
    ) {
        await handlePurchaseProductPaymentSuccess(
            metaData?.orderId,
            transactionId,
            amount
        );
    } else if (
        metaData.paymentPurpose == ENUM_PAYMENT_PURPOSE.PACKAGE_PURCHASE
    ) {
        await handlePackagePurchaseSuccess(
            metaData.packagePurchaseId,
            transactionId,
            amount
        );
    }
};

const handleCoursePurchasePaymentSuccess = async (
    coursePurchaseId: string,
    transactionId: string,
    amount: number
) => {
    const io = getIO();
    const purchaseCourse = await PurchaseCourse.findById(coursePurchaseId)
        .populate<ICourse>({ path: 'course' })
        .populate<INormalUser>({ path: 'user' });
    if (!purchaseCourse) {
        throw new AppError(httpStatus.NOT_FOUND, 'Purchase course not found');
    }

    await PurchaseCourse.findByIdAndUpdate(
        coursePurchaseId,
        {
            paymentStatus: ENUM_PAYMENT_STATUS.PAID,
        },
        { new: true, runValidators: true }
    );

    await Transaction.create({
        user: purchaseCourse.user?._id,
        type: ENUM_TRANSACTION_TYPE.PURCHASE_COURSE,
        amount: amount,
        transactionId,
    });

    //!TODO: need to work for push notification ============================>
    await Notification.create({
        title: 'Your payment is successful for purchase course',
        message: `Congratullations you successfully purchase subscription`,
        receiver: purchaseCourse.user._id.toString(),
    });
    const updatedNotificationCount = await getUserNotificationCount(
        purchaseCourse.user._id.toString()
    );
    io.to(purchaseCourse.user._id.toString()).emit(
        'notifications',
        updatedNotificationCount
    );
};

const handlePurchaseProductPaymentSuccess = async (
    orderId: string,
    transactionId: string,
    amount: number
) => {
    const io = getIO();
    const order = await Order.findById(orderId).populate({
        path: 'user',
        select: 'email name',
    });
    if (!order) {
        throw new AppError(httpStatus.NOT_FOUND, 'order not found');
    }
    await Order.findByIdAndUpdate(
        orderId,
        { paymentStatus: ENUM_PAYMENT_STATUS.PAID },
        { new: true, runValidators: true }
    );

    await Transaction.create({
        user: order?.user?._id,
        type: ENUM_TRANSACTION_TYPE.PURCHASE_PRODUCT,
        amount: amount,
        transactionId,
    });

    await Notification.create({
        title: 'Order Completed',
        message: `Congratullations your order successfully proceed`,
        receiver: order.user._id,
    });
    const updatedNotificationCount = await getUserNotificationCount(
        order.user._id.toString()
    );
    io.to(order.user._id.toString()).emit(
        'notifications',
        updatedNotificationCount
    );
};

const handlePackagePurchaseSuccess = async (
    packagePurchaseId: string,
    transactionId: string,
    amount: number
) => {
    const purchasePackage = await PackagePurchase.findById(packagePurchaseId);
    if (!purchasePackage) {
        throw new AppError(httpStatus.NOT_FOUND, 'Purchased package not found');
    }

    await PackagePurchase.findByIdAndUpdate(packagePurchaseId, {
        paymentStatus: ENUM_PAYMENT_STATUS.PAID,
    });

    await Transaction.create({
        user: purchasePackage.user,
        type: ENUM_TRANSACTION_TYPE.PACKAGE_PURCHASE,
        amount,
        transactionId,
    });

    const notificationData = {
        title: 'Payment successfull for pacakage purchase',
        message: `Your payment is successfull for package purchase . Thank you for purchasing`,
        receiver: purchasePackage.user.toString(),
        type: ENUM_NOTIFICATION_TYPE.PAYMENT,
    };

    sendNotification(notificationData);
};

export default handlePaymentSuccess;
