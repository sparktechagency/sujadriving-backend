import { z } from 'zod';
import { Types } from 'mongoose';

const createHazardVideoValidationSchema = z.object({
    hazardTopic: z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid ObjectId format',
    }),
    video_url: z.string().url({
        message: 'Invalid URL format',
    }),
    dangerTimes: z.array(z.string()).min(1, {
        message: 'At least one danger time is required',
    }),
});

const HazardVideoValidations = {
    createHazardVideoValidationSchema,
};

export default HazardVideoValidations;
