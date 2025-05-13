import { z } from "zod";

export const updateHazard-topicData = z.object({
    body: z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    }),
});

const Hazard-topicValidations = { updateHazard-topicData };
export default Hazard-topicValidations;