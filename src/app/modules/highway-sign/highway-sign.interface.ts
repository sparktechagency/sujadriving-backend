import { Types } from 'mongoose';

export interface IHighwaySign {
    signType: Types.ObjectId;
    sign_image: string;
    description: string;
}
