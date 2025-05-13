import { z } from 'zod';

// Zod schema for creating a new HighwaySign
const createHighwaySignValidationSchema = z.object({
    body: z.object({
        signType: z.string().min(1, 'Sign type is required'),
        description: z.string().min(1, 'Description is required'),
    }),
});

// Zod schema for updating an existing HighwaySign
const updateHighwaySignValidationSchema = z.object({
    signType: z.string().optional(),
    sign_image: z.string().optional(),
    description: z.string().optional(),
});

const HighWaySignValidations = {
    createHighwaySignValidationSchema,
    updateHighwaySignValidationSchema,
};

export default HighWaySignValidations;
