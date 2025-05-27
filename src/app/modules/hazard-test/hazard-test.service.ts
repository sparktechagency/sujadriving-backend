import httpStatus from "http-status";
import AppError from "../../error/appError";
import { IHazard-test } from "./hazard-test.interface";
import hazard-testModel from "./hazard-test.model";

const updateUserProfile = async (id: string, payload: Partial<IHazard-test>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await hazard-testModel.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await hazard-testModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const Hazard-testServices = { updateUserProfile };
export default Hazard-testServices;