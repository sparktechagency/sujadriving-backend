import mongoose, { Schema } from 'mongoose';
import { IHazardTopic } from './hazard-topic.interface';

const hazardTopicSchema = new Schema<IHazardTopic>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    topic_icon: {
        type: String,
        required: true,
    },
});

const HazardTopic = mongoose.model<IHazardTopic>(
    'HazardTopic',
    hazardTopicSchema
);

export default HazardTopic;
