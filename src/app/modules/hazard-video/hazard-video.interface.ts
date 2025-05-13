import { Types } from 'mongoose';

export interface IHazardVideo {
    hazardTopic: Types.ObjectId;
    video_url: string;
    dangerTimes: string[];
}
