import { z } from 'zod';

const subscriptionPurchaseValidationSchema = z.object({
    body: z.object({
        subscription: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, 'Invalid subscription ID format'),
        user: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format'),
    }),
});

const SubscriptionPurchaseValidations = {
    subscriptionPurchaseValidationSchema,
};

export default SubscriptionPurchaseValidations;
