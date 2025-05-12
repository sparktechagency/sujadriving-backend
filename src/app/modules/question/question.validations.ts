import { z } from 'zod';

const createQuestionValidationSchema = z.object({
    body: z.object({
        topic: z.string().uuid(),
        question: z.string().min(1, 'Question is required'),
        options: z
            .array(z.string())
            .length(2, 'Options array must have exactly 2 elements'),
        answer: z.string().min(1, 'Answer is required'),
        explanation: z.string().optional(),
    }),
});

const updateQuestionValidationSchema = z.object({
    body: z.object({
        topic: z.string().uuid().optional(),
        question: z.string().min(1, 'Question is required').optional(),
        options: z
            .array(z.string())
            .length(2, 'Options array must have exactly 2 elements')
            .optional(),
        answer: z.string().min(1, 'Answer is required').optional(),
        explanation: z.string().optional(),
    }),
});

const QuestionValidations = {
    createQuestionValidationSchema,
    updateQuestionValidationSchema,
};

export default QuestionValidations;
