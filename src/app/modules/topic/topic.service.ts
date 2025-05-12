import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { ITopic } from './topic.interface';
import Category from '../category/category.model';
import { Topic } from './topic.model';

const createTopic = async (payload: ITopic) => {
    const category = await Category.findById(payload.category);
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
    }

    const result = await Topic.create(payload);
    return result;
};

const TopicServices = { createTopic };
export default TopicServices;
