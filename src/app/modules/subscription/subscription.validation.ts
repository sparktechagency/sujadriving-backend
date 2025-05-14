import { z } from 'zod';

const createSubscriptionValidationSchema = z.object({
    body: z.object({
        type: z.string().min(1, 'Type is required'),
        price: z.number().min(0, 'Price must be a positive number'),
        description: z.string().min(1, 'Description is required'),
    }),
});

const SubscriptionValidations = {
    createSubscriptionValidationSchema,
};

export default SubscriptionValidations;
