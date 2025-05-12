import httpStatus from "http-status";
import AppError from "../../error/appError";
import { ITopic } from "./topic.interface";
import topicModel from "./topic.model";

const updateUserProfile = async (id: string, payload: Partial<ITopic>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await topicModel.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await topicModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const TopicServices = { updateUserProfile };
export default TopicServices;