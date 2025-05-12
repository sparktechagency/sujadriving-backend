/* eslint-disable @typescript-eslint/no-explicit-any */
import Class from '../class/class.model';
import Course from '../course/course.model';
import NormalUser from '../normalUser/normalUser.model';
import Product from '../product/product.model';
import Transaction from '../transaction/transaction.model';

const getDashboardMetaData = async () => {
    const [totalUser, totalProduct, totalCourse, totalClass] =
        await Promise.all([
            NormalUser.countDocuments(),
            Product.countDocuments({ isDeleted: false }),
            Course.countDocuments(),
            Class.countDocuments({ isDeleted: false }),
        ]);

    const earning = await Transaction.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: '$amount' },
            },
        },
    ]);

    const totalEarning = earning[0]?.total || 5000;

    return { totalUser, totalProduct, totalClass, totalCourse, totalEarning };
};

const getUserChartData = async (year: number) => {
    const currentYear = year || new Date().getFullYear();

    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear + 1, 0, 1);

    const chartData = await NormalUser.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startOfYear,
                    $lt: endOfYear,
                },
            },
        },
        {
            $group: {
                _id: { $month: '$createdAt' },
                totalUser: { $sum: 1 },
            },
        },
        {
            $project: {
                month: '$_id',
                totalUser: 1,
                _id: 0,
            },
        },
        {
            $sort: { month: 1 },
        },
    ]);

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    const data = Array.from({ length: 12 }, (_, index) => ({
        month: months[index],
        totalUser:
            chartData.find((item) => item.month === index + 1)?.totalUser || 0,
    }));

    const yearsResult = await NormalUser.aggregate([
        {
            $group: {
                _id: { $year: '$createdAt' },
            },
        },
        {
            $project: {
                year: '$_id',
                _id: 0,
            },
        },
        {
            $sort: { year: 1 },
        },
    ]);

    const yearsDropdown = yearsResult.map((item: any) => item.year);

    return {
        chartData: data,
        yearsDropdown,
    };
};

// const getEarningsByType = async (year: number) => {
//     const currentYear = year || new Date().getFullYear();

//     const startOfYear = new Date(currentYear, 0, 1);
//     const endOfYear = new Date(currentYear + 1, 0, 1);

//     const result = await Transaction.aggregate([
//         {
//             $match: {
//                 createdAt: {
//                     $gte: startOfYear,
//                     $lt: endOfYear,
//                 },
//             },
//         },
//         {
//             $group: {
//                 _id: {
//                     month: { $month: '$createdAt' }, // Group by month
//                     type: '$type', // Group by transaction type (Token, Merchandise, Course)
//                 },
//                 totalEarning: { $sum: '$amount' }, // Sum of amounts for each group
//             },
//         },
//         {
//             $project: {
//                 month: '$_id.month',
//                 type: '$_id.type',
//                 totalEarning: 1,
//                 _id: 0,
//             },
//         },
//         {
//             $sort: { month: 1, type: 1 }, // Sort by month and transaction type
//         },
//     ]);

//     // Types of transactions we are interested in
//     const types = ['PURCHASE_COURSE', 'PACKAGE_PURCHASE', 'PURCHASE_PRODUCT'];

//     // Month names
//     const months = [
//         'Jan',
//         'Feb',
//         'Mar',
//         'Apr',
//         'May',
//         'Jun',
//         'Jul',
//         'Aug',
//         'Sep',
//         'Oct',
//         'Nov',
//         'Dec',
//     ];

//     // Build the structured data in the required format
//     const data = types.map((type) => {
//         return {
//             type,
//             data: months.map((_, index) => {
//                 const monthData = result.find(
//                     (item) => item.month === index + 1 && item.type === type
//                 );
//                 return {
//                     month: months[index],
//                     totalEarning: monthData ? monthData.totalEarning : 0,
//                 };
//             }),
//         };
//     });

//     return data;
// };
const getEarningsByType = async (year: number) => {
    const currentYear = year || new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear + 1, 0, 1);

    const result = await Transaction.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startOfYear,
                    $lt: endOfYear,
                },
            },
        },
        {
            $group: {
                _id: {
                    month: { $month: '$createdAt' },
                    type: '$type', // Group by transaction type (Token, Merchandise, Course)
                },
                totalEarning: { $sum: '$amount' }, // Sum of amounts for each group
            },
        },
        {
            $project: {
                month: '$_id.month',
                type: '$_id.type',
                totalEarning: 1,
                _id: 0,
            },
        },
        {
            $sort: { month: 1, type: 1 }, // Sort by month and transaction type
        },
        {
            $group: {
                _id: '$month', // Group by month
                totalTokenEarning: {
                    $sum: {
                        $cond: [
                            { $eq: ['$type', 'PACKAGE_PURCHASE'] }, // Token Type
                            '$totalEarning',
                            0,
                        ],
                    },
                },
                totalCourseEarning: {
                    $sum: {
                        $cond: [
                            { $eq: ['$type', 'PURCHASE_COURSE'] }, // Course Type
                            '$totalEarning',
                            0,
                        ],
                    },
                },
                totalProductEarning: {
                    $sum: {
                        $cond: [
                            { $eq: ['$type', 'PURCHASE_PRODUCT'] }, // Product Type
                            '$totalEarning',
                            0,
                        ],
                    },
                },
            },
        },
        {
            $project: {
                month: '$_id',
                totalTokenEarning: 1,
                totalCourseEarning: 1,
                totalProductEarning: 1,
                _id: 0,
            },
        },
        {
            $sort: { month: 1 }, // Sort by month
        },
    ]);

    // Format the result data for the response
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    const chartData = months.map((month, index) => {
        const monthData = result.find((item) => item.month === index + 1);

        return {
            month,
            totalTokenEarning: monthData ? monthData.totalTokenEarning : 0,
            totalCourseEarning: monthData ? monthData.totalCourseEarning : 0,
            totalProductEarning: monthData ? monthData.totalProductEarning : 0,
        };
    });
    const yearsResult = await NormalUser.aggregate([
        {
            $group: {
                _id: { $year: '$createdAt' },
            },
        },
        {
            $project: {
                year: '$_id',
                _id: 0,
            },
        },
        {
            $sort: { year: 1 },
        },
    ]);

    const yearsDropdown = yearsResult.map((item: any) => item.year);
    return { chartData, yearsDropdown };
};

const MetaService = {
    getDashboardMetaData,
    getUserChartData,
    getEarningsByType,
};

export default MetaService;
