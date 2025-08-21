import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { IHazardVideo } from './hazard-video.interface';
import HazardVideo from './hazard-video.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { deleteFileFromS3 } from '../../helper/deleteFromS3';
import Notification from '../notification/notification.model';
import { sendPushNotificationToEveryone } from '../../helper/sendPushNotification';

// Create
const createHazardVideo = async (payload: IHazardVideo) => {
    const result = await HazardVideo.create(payload);
    Notification.create({
        title: 'New Hazard Video Added',
        message: `A new hazard video has been added for topic ${result.hazardTopic} , start your practice now!`,
        receiver: 'all',
        type: 'hazard_video',
    });
    sendPushNotificationToEveryone(
        'New Hazard Video Added',
        `A new hazard video has been added for topic ${result.hazardTopic}`,
        { videoId: result._id.toString() }
    );
    return result;
};

// Get all
const getAllHazardVideos = async (query: Record<string, unknown>) => {
    const hazardVideoQuery = new QueryBuilder(
        HazardVideo.find().populate('hazardTopic', 'name topic_icon'),
        query
    )
        .search(['video_url'])
        .fields()
        .filter()
        .paginate()
        .sort();

    const result = await hazardVideoQuery.modelQuery;
    const meta = await hazardVideoQuery.countTotal();

    return {
        meta,
        result,
    };
};

// Get a single
const getHazardVideoById = async (id: string) => {
    const result = await HazardVideo.findById(id).populate('hazardTopic');
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'HazardVideo not found');
    }
    return result;
};

// Update
const updateHazardVideo = async (
    id: string,
    payload: Partial<IHazardVideo>
) => {
    const hazardVideo = await HazardVideo.findById(id);
    if (!hazardVideo) {
        throw new AppError(httpStatus.NOT_FOUND, 'HazardVideo not found');
    }

    const result = await HazardVideo.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'HazardVideo not found');
    }

    if (payload.video_url && hazardVideo.video_url) {
        deleteFileFromS3(hazardVideo.video_url);
    }
    return result;
};

// Delete
const deleteHazardVideo = async (id: string) => {
    const result = await HazardVideo.findByIdAndDelete(id);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'HazardVideo not found');
    }
    if (result.video_url) {
        deleteFileFromS3(result.video_url);
    }

    return result;
};

const HazardVideoService = {
    createHazardVideo,
    getAllHazardVideos,
    getHazardVideoById,
    updateHazardVideo,
    deleteHazardVideo,
};

export default HazardVideoService;
