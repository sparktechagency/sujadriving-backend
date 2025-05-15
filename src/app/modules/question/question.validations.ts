import { z } from 'zod';

const createQuestionValidationSchema = z.object({
    body: z.object({
        topic: z.string(),
        question: z.string().min(1, 'Question is required'),
        options: z.array(z.string()),
        answer: z.string().min(1, 'Answer is required'),
        explanation: z.string().optional(),
    }),
});

const updateQuestionValidationSchema = z.object({
    body: z.object({
        topic: z.string().optional(),
        question: z.string().min(1, 'Question is required').optional(),
        options: z.array(z.string()).optional(),
        answer: z.string().min(1, 'Answer is required').optional(),
        explanation: z.string().optional(),
    }),
});

const QuestionValidations = {
    createQuestionValidationSchema,
    updateQuestionValidationSchema,
};

export default QuestionValidations;
