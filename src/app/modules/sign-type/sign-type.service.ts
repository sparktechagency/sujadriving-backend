import httpStatus from "http-status";
import AppError from "../../error/appError";
import { ISign-type } from "./sign-type.interface";
import sign-typeModel from "./sign-type.model";

const updateUserProfile = async (id: string, payload: Partial<ISign-type>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await sign-typeModel.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await sign-typeModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const Sign-typeServices = { updateUserProfile };
export default Sign-typeServices;