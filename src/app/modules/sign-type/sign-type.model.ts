import mongoose, { Schema } from 'mongoose';
import { ISignType } from './sign-type.interface';

const categorySchema = new Schema<ISignType>({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

const Category = mongoose.model<ISignType>('Category', categorySchema);

export default Category;
