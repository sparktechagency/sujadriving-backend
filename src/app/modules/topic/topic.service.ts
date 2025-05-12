import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { ITopic } from './topic.interface';
import Category from '../category/category.model';
import { Topic } from './topic.model';
import QueryBuilder from '../../builder/QueryBuilder';

// Create Topic
const createTopic = async (payload: ITopic) => {
    const category = await Category.findById(payload.category);
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
    }

    const result = await Topic.create(payload);
    return result;
};

// Get All Topics
const getAllTopics = async (query: Record<string, unknown>) => {
    const topicQuery = new QueryBuilder(Topic.find(), query)
        .search(['name'])
        .fields()
        .filter()
        .paginate()
        .sort();

    const result = await topicQuery.modelQuery;
    const meta = await topicQuery.countTotal();
    return {
        meta,
        result,
    };
};

// Get Topic by ID
const getTopicById = async (topicId: string) => {
    const topic = await Topic.findById(topicId).populate('category', 'name');
    if (!topic) {
        throw new AppError(httpStatus.NOT_FOUND, 'Topic not found');
    }
    return topic;
};

// Update Topic
const updateTopic = async (topicId: string, payload: ITopic) => {
    if (payload.category) {
        const category = await Category.findById(payload.category);
        if (!category) {
            throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
        }
    }

    const updatedTopic = await Topic.findByIdAndUpdate(
        topicId,
        { ...payload },
        { new: true }
    );

    if (!updatedTopic) {
        throw new AppError(httpStatus.NOT_FOUND, 'Topic not found');
    }

    return updatedTopic;
};

// Delete Topic
const deleteTopic = async (topicId: string) => {
    const deletedTopic = await Topic.findByIdAndUpdate(
        topicId,
        { isDeleted: true },
        { new: true, runValidators: true }
    );
    if (!deletedTopic) {
        throw new AppError(httpStatus.NOT_FOUND, 'Topic not found');
    }
    return deleteTopic;
};

const TopicServices = {
    createTopic,
    getAllTopics,
    getTopicById,
    updateTopic,
    deleteTopic,
};

export default TopicServices;
