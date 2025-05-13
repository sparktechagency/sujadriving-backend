import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { IHighwaySign } from './highway-sign.interface';
import HighwaySign from './highway-sign.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { deleteFileFromS3 } from '../../helper/deleteFromS3';

// Create a new HighwaySign
const createHighwaySign = async (payload: IHighwaySign) => {
    const result = await HighwaySign.create(payload);
    return result;
};

// Get all HighwaySigns
const getAllHighwaySigns = async (query: Record<string, unknown>) => {
    const highwaySignQuery = new QueryBuilder(HighwaySign.find(), query)
        .search(['description'])
        .fields()
        .filter()
        .paginate()
        .sort();

    const result = await highwaySignQuery.modelQuery;
    const meta = await highwaySignQuery.countTotal();

    return {
        meta,
        result,
    };
};

// Get a single HighwaySign by ID
const getHighwaySignById = async (id: string) => {
    const result = await HighwaySign.findById(id).populate('signType');
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'HighwaySign not found');
    }
    return result;
};

// Update an existing HighwaySign by ID
const updateHighwaySign = async (
    id: string,
    payload: Partial<IHighwaySign>
) => {
    const highwaySign = await HighwaySign.findById(id);
    if (!highwaySign) {
        throw new AppError(httpStatus.NOT_FOUND, 'HighwaySign not found');
    }

    const result = await HighwaySign.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'HighwaySign not found');
    }

    // If the sign_image is updated, delete the previous one from S3
    if (payload.sign_image && highwaySign.sign_image) {
        deleteFileFromS3(highwaySign.sign_image);
    }

    return result;
};

// Delete a HighwaySign by ID
const deleteHighwaySign = async (id: string) => {
    const result = await HighwaySign.findByIdAndDelete(id);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'HighwaySign not found');
    }

    // If the sign_image exists, delete it from S3
    if (result.sign_image) {
        deleteFileFromS3(result.sign_image);
    }

    return result;
};

// Export the service functions
const HighwaySignService = {
    createHighwaySign,
    getAllHighwaySigns,
    getHighwaySignById,
    updateHighwaySign,
    deleteHighwaySign,
};

export default HighwaySignService;
