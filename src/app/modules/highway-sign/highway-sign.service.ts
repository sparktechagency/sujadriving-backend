import httpStatus from "http-status";
import AppError from "../../error/appError";
import { IHighway-sign } from "./highway-sign.interface";
import highway-signModel from "./highway-sign.model";

const updateUserProfile = async (id: string, payload: Partial<IHighway-sign>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await highway-signModel.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await highway-signModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const Highway-signServices = { updateUserProfile };
export default Highway-signServices;