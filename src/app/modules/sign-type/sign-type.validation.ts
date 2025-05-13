import { z } from 'zod';

const createSignTypeValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }),
    }),
});
const updateSignTypeValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
    }),
});

const SignTypeValidations = {
    createSignTypeValidationSchema,
    updateSignTypeValidationSchema,
};

export default SignTypeValidations;
