import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { IHazardTopic } from './hazard-topic.interface';
import HazardTopic from './hazard-topic.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { deleteFileFromS3 } from '../../helper/deleteFromS3';

// Create a new HazardTopic
const createHazardTopic = async (payload: IHazardTopic) => {
    const result = await HazardTopic.create(payload);
    return result;
};

// Get all HazardTopics
const getAllHazardTopics = async (query: Record<string, unknown>) => {
    const hazardTopicQuery = new QueryBuilder(HazardTopic.find(), query)
        .search(['name'])
        .fields()
        .filter()
        .paginate()
        .sort();

    const result = await hazardTopicQuery.modelQuery;
    const meta = await hazardTopicQuery.countTotal();

    return {
        meta,
        result,
    };
};

// Get a single HazardTopic by ID
const getHazardTopicById = async (id: string) => {
    const result = await HazardTopic.findById(id);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'HazardTopic not found');
    }
    return result;
};

// Update an existing HazardTopic by ID
const updateHazardTopic = async (
    id: string,
    payload: Partial<IHazardTopic>
) => {
    const hazardTopic = await HazardTopic.findById(id);
    if (!hazardTopic) {
        throw new AppError(httpStatus.NOT_FOUND, 'HazardTopic not found');
    }

    const result = await HazardTopic.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'HazardTopic not found');
    }

    // If the topic_icon is updated, delete the previous one from S3
    if (payload.topic_icon && hazardTopic.topic_icon) {
        deleteFileFromS3(hazardTopic.topic_icon);
    }

    return result;
};

// Delete a HazardTopic by ID
const deleteHazardTopic = async (id: string) => {
    const result = await HazardTopic.findByIdAndDelete(id);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'HazardTopic not found');
    }

    if (result.topic_icon) {
        deleteFileFromS3(result.topic_icon);
    }

    return result;
};

// Export the service functions
const HazardTopicService = {
    createHazardTopic,
    getAllHazardTopics,
    getHazardTopicById,
    updateHazardTopic,
    deleteHazardTopic,
};

export default HazardTopicService;
