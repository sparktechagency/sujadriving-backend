import { z } from 'zod';

export const createNormalUserSchema = z.object({
    body: z.object({
        password: z
            .string({ required_error: 'Password is required' })
            .min(6, { message: 'Password must be 6 character' }),
        confirmPassword: z
            .string({ required_error: 'Confirm password is required' })
            .min(6, { message: 'Password must be 6 character' }),

        name: z.string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        }),
        email: z.string().email('Invalid email format'),
    }),
});
export const updateNormalUserData = z.object({
    body: z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
    }),
});

const normalUserValidations = {
    createNormalUserSchema,
    updateNormalUserData,
};

export default normalUserValidations;
