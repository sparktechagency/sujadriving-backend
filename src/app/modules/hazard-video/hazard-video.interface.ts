import { Types } from 'mongoose';

export interface IHazardVideo {
    hazardTopic: Types.ObjectId;
    video_url: string;
    thumbnail_url?: string;
    dangerTimes: number[];
}
