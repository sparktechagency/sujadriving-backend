import { z } from 'zod';

const createHazardTopicValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required'),
    }),
});

const updateHazardTopicValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        topic_icon: z.string().optional(),
    }),
});

const HazardTopicValidations = {
    createHazardTopicValidationSchema,
    updateHazardTopicValidationSchema,
};

export default HazardTopicValidations;
