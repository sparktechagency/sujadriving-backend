import { z } from 'zod';

// Zod schema for creating a new HazardTopic
const createHazardTopicValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required'),
    }),
});

// Zod schema for updating an existing HazardTopic
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
