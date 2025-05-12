/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import AdminServices from './admin.services';
import { getCloudFrontUrl } from '../../helper/mutler-s3-uploader';

// register Admin
const createAdmin = catchAsync(async (req, res) => {
    const result = await AdminServices.createAdmin(
        req?.body?.password,
        req?.body?.admin
    );
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Admin created successfully',
        data: result,
    });
});

const updateAdminProfile = catchAsync(async (req, res) => {
    const file: any = req.files?.profile_image;
    if (req.files?.profile_image) {
        req.body.profile_image = getCloudFrontUrl(file[0].key);
    }
    const result = await AdminServices.updateAdminProfile(
        req?.user?.id,
        req?.body
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin profile updated successfully',
        data: result,
    });
});

const deleteAdmin = catchAsync(async (req, res) => {
    const result = await AdminServices.deleteAdminFromDB(req?.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin deleted successfully',
        data: result,
    });
});

// update shop status
const updateAdminStatus = catchAsync(async (req, res) => {
    const result = await AdminServices.updateAdminStatus(
        req?.params?.id,
        req?.body?.status
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin status updated successfully',
        data: result,
    });
});
const getAllAdmin = catchAsync(async (req, res) => {
    const result = await AdminServices.getAllAdminFromDB(req?.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin retrieved successfully',
        data: result,
    });
});

const AdminController = {
    updateAdminProfile,
    createAdmin,
    updateShopStatus: updateAdminStatus,
    getAllAdmin,
    deleteAdmin,
};

export default AdminController;
