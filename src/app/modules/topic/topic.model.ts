import { Schema, model } from 'mongoose';
import { ITopic } from './topic.interface';

const TopicSchema = new Schema<ITopic>(
    {
        category: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Category',
        },
        name: { type: String, required: true },
    },
    { timestamps: true }
);

const Topic = model<ITopic>('Topic', TopicSchema);

export { Topic };
