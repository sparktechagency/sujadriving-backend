import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { ISignType } from './sign-type.interface';
import SignType from './sign-type.model';
import QueryBuilder from '../../builder/QueryBuilder';

// Create a new SignType
const createSignType = async (payload: ISignType) => {
    const result = await SignType.create(payload);
    return result;
};

// Get all SignTypes
const getAllSignTypes = async (query: Record<string, unknown>) => {
    const signQuery = new QueryBuilder(SignType.find(), query)
        .search(['name'])
        .fields()
        .filter()
        .paginate()
        .sort();
    const result = await signQuery.modelQuery;
    const meta = await signQuery.countTotal();
    return {
        meta,
        result,
    };
};

// Get a single SignType by ID
const getSignTypeById = async (id: string) => {
    const result = await SignType.findById(id);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'SignType not found');
    }
    return result;
};

// Update an existing SignType by ID
const updateSignType = async (id: string, payload: Partial<ISignType>) => {
    const result = await SignType.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'SignType not found');
    }

    return result;
};

// Delete a SignType by ID
const deleteSignType = async (id: string) => {
    const result = await SignType.findByIdAndDelete(id);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'SignType not found');
    }
    return result;
};

// Export the service functions
const SignTypeService = {
    createSignType,
    getAllSignTypes,
    getSignTypeById,
    updateSignType,
    deleteSignType,
};

export default SignTypeService;
