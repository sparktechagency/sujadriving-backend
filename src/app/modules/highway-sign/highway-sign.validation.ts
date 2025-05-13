import { z } from "zod";

export const updateHighway-signData = z.object({
    body: z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    }),
});

const Highway-signValidations = { updateHighway-signData };
export default Highway-signValidations;