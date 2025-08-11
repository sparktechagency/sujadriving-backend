import { z } from 'zod';

export const quizSubmissionSchema = z.object({
    topicId: z.string().min(1, { message: 'Topic ID is required' }),
    answers: z
        .array(
            z.object({
                questionId: z
                    .string()
                    .min(1, { message: 'Question ID is required' }),
                selected: z
                    .string()
                    .min(1, { message: 'Selected answer is required' }),
            })
        )
        .min(1, { message: 'At least one answer must be provided' }),
});

const ResultValidations = { quizSubmissionSchema };
export default ResultValidations;
