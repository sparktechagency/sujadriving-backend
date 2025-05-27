import { z } from "zod";

export const updateHazard-testData = z.object({
    body: z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    }),
});

const Hazard-testValidations = { updateHazard-testData };
export default Hazard-testValidations;