import mongoose, { Schema } from 'mongoose';
import { IHighwaySign } from './highway-sign.interface';

const highwaySignSchema = new Schema<IHighwaySign>({
    signType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SignType',
        required: true,
    },
    sign_image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const HighwaySign = mongoose.model<IHighwaySign>(
    'HighwaySign',
    highwaySignSchema
);

export default HighwaySign;
