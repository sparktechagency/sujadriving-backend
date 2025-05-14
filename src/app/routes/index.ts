import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { ManageRoutes } from '../modules/manage-web/manage.routes';
import { normalUserRoutes } from '../modules/normalUser/normalUser.routes';
import { notificationRoutes } from '../modules/notification/notification.routes';
import { categoryRoutes } from '../modules/category/category.routes';
import { bannerRoutes } from '../modules/banner/banner.routes';
import { metaRoutes } from '../modules/meta/meta.routes';
import { feedbackRoutes } from '../modules/feedback/feedback.routes';
import { transactionRoutes } from '../modules/transaction/transaction.routes';
import { topicRoutes } from '../modules/topic/topic.routes';
import { questionRoutes } from '../modules/question/question.routes';
import { signTypeRoutes } from '../modules/sign-type/sign-type.routes';
import { highwaySignRoutes } from '../modules/highway-sign/highway-sign.routes';
import { hazardVideoRoutes } from '../modules/hazard-video/hazard-video.routes';
import { subscriptionRoutes } from '../modules/subscription/subscription.routes';
import { subscriptionPurchaseRoutes } from '../modules/subscription-purchase/subscription-purchase.routes';
const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        router: authRoutes,
    },
    {
        path: '/user',
        router: userRoutes,
    },
    {
        path: '/normal-user',
        router: normalUserRoutes,
    },

    {
        path: '/manage',
        router: ManageRoutes,
    },
    {
        path: '/notification',
        router: notificationRoutes,
    },
    {
        path: '/category',
        router: categoryRoutes,
    },

    {
        path: '/banner',
        router: bannerRoutes,
    },
    {
        path: '/meta',
        router: metaRoutes,
    },
    {
        path: '/feedback',
        router: feedbackRoutes,
    },

    {
        path: '/transaction',
        router: transactionRoutes,
    },

    {
        path: '/topic',
        router: topicRoutes,
    },

    {
        path: '/question',
        router: questionRoutes,
    },
    {
        path: '/sign-type',
        router: signTypeRoutes,
    },
    {
        path: '/highway-sign',
        router: highwaySignRoutes,
    },
    {
        path: '/highway-sign',
        router: highwaySignRoutes,
    },
    {
        path: '/hazard-video',
        router: hazardVideoRoutes,
    },
    {
        path: '/subscription',
        router: subscriptionRoutes,
    },
    {
        path: '/subscription-purchase',
        router: subscriptionPurchaseRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
