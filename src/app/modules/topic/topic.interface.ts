import { Types } from 'mongoose';
export interface ITopic {
    category: Types.ObjectId;
    name: string;
}
