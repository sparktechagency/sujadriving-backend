import httpStatus from "http-status";
import AppError from "../../error/appError";
import { ISubscription-purchase } from "./subscription-purchase.interface";
import subscription-purchaseModel from "./subscription-purchase.model";

const updateUserProfile = async (id: string, payload: Partial<ISubscription-purchase>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await subscription-purchaseModel.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await subscription-purchaseModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const Subscription-purchaseServices = { updateUserProfile };
export default Subscription-purchaseServices;