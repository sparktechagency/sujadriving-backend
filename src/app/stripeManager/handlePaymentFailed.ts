/* eslint-disable @typescript-eslint/no-explicit-any */
import sendNotification from '../helper/sendNotification';
import { ENUM_NOTIFICATION_TYPE } from '../utilities/enum';

const handlePaymentFailed = async (metaData: any) => {
    const notificationData = {
        title: 'Payment failed',
        message: `Your payment failed for ${metaData.paymentPurpose}`,
        receiver: metaData.userId,
        type: ENUM_NOTIFICATION_TYPE.PAYMENT,
    };

    sendNotification(notificationData);
};

export default handlePaymentFailed;
