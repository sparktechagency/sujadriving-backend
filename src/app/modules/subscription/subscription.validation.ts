import { z } from 'zod';

const createSubscriptionValidationSchema = z.object({
    body: z.object({
        type: z
            .string({ required_error: 'Subscription type is required' })
            .min(1, 'Type is required'),
        price: z
            .number({ required_error: 'Price is required' })
            .min(0, 'Price must be a positive number'),
        description: z
            .string({ required_error: 'Description is required' })
            .min(1, 'Description is required'),
    }),
});
const updateSubscriptionValidationSchema = z.object({
    body: z.object({
        type: z.string().optional(),
        price: z.number().optional(),
        description: z.string().optional(),
    }),
});

const SubscriptionValidations = {
    createSubscriptionValidationSchema,
    updateSubscriptionValidationSchema,
};

export default SubscriptionValidations;
