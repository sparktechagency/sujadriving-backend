import { z } from 'zod';

const hazardTestValidaitonSchema = z.object({
    body: z.object({
        video: z.string({ required_error: 'Video id is required' }),
        submissions: z.array(z.number(), {
            required_error: 'Submissions are required',
        }),
    }),
});

const HazardTestValidations = {
    hazardTestValidaitonSchema,
};

export default HazardTestValidations;
