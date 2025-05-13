import httpStatus from "http-status";
import AppError from "../../error/appError";
import { IHazard-video } from "./hazard-video.interface";
import hazard-videoModel from "./hazard-video.model";

const updateUserProfile = async (id: string, payload: Partial<IHazard-video>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await hazard-videoModel.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await hazard-videoModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const Hazard-videoServices = { updateUserProfile };
export default Hazard-videoServices;