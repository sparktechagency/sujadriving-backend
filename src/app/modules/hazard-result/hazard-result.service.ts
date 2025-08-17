import httpStatus from 'http-status';
import AppError from '../../error/appError';
import HazardVideo from '../hazard-video/hazard-video.model';
import { IHazardResult } from './hazard-result.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import HazardResult from './hazard-result.model';

function minuteSecondToSeconds(time: number): number {
    const minutes = Math.floor(time); // integer part = minutes
    const seconds = Math.round((time - minutes) * 100); // decimal part * 100 = seconds
    return minutes * 60 + seconds;
}

const createHazardResultResult = async (
    profileId: string,
    payload: IHazardResult & { submissions: number[] }
) => {
    const video = await HazardVideo.findById(payload.video);
    if (!video) {
        throw new AppError(httpStatus.NOT_FOUND, 'Video not found');
    }

    const dangerTimesInSeconds = video.dangerTimes.map(minuteSecondToSeconds);
    const submissionsInSeconds = payload.submissions.map(minuteSecondToSeconds);
    console.log('danger times in second', dangerTimesInSeconds);
    console.log('submission in seconds', submissionsInSeconds);

    let rightSubmission = 0;
    let wrongSubmission = 0;

    for (const submissionSec of submissionsInSeconds) {
        const isCorrect = dangerTimesInSeconds.some(
            (dangerSec) => Math.abs(dangerSec - submissionSec) <= 1
        );

        if (isCorrect) rightSubmission++;
        else wrongSubmission++;
    }

    const total = submissionsInSeconds.length;
    const accuracy = total === 0 ? 0 : rightSubmission / total;
    const accuracyParcentage = accuracy * 100;
    const result = await HazardResult.create({
        topic: video.hazardTopic,
        user: profileId,
        video: payload.video,
        rightSubmission,
        wrongSubmission,
        accuracy,
        totalDangerZone: video.dangerTimes.length,
        accuracyParcentage,
    });
    return result;
};

const getAllHazardResultResult = async (query: Record<string, unknown>) => {
    const resultQuery = new QueryBuilder(HazardResult.find(), query)
        .search([''])
        .fields()
        .filter()
        .paginate()
        .sort();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();
    return {
        meta,
        result,
    };
};

const getMyHazardResults = async (
    profileId: string,
    query: Record<string, unknown>
) => {
    const resultQuery = new QueryBuilder(
        HazardResult.find({ user: profileId }),
        query
    )
        .search([''])
        .fields()
        .filter()
        .paginate()
        .sort();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();
    return {
        meta,
        result,
    };
};

const HazardResultService = {
    createHazardResultResult,
    getAllHazardResultResult,
    getMyHazardResults,
};

export default HazardResultService;
