import mongoose, { Schema } from 'mongoose';
import { ISignType } from './sign-type.interface';

const categorySchema = new Schema<ISignType>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    icon: {
        type: String,
        required: true,
    },
});

const SignType = mongoose.model<ISignType>('SignType', categorySchema);

export default SignType;
