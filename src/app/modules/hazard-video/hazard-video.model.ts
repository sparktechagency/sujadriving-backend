import { model, Schema } from 'mongoose';
import { IHazardVideo } from './hazard-video.interface';

const hazardVideoSchema = new Schema<IHazardVideo>({
    hazardTopic: {
        type: Schema.Types.ObjectId,
        ref: 'HazardTopic',
        required: true,
    },
    video_url: {
        type: String,
        required: true,
    },
    thumbnail_url: {
        type: String,
        required: true,
    },
    dangerTimes: {
        type: [Number],
        required: true,
    },
});

const HazardVideo = model<IHazardVideo>('HazardVideo', hazardVideoSchema);

export default HazardVideo;
