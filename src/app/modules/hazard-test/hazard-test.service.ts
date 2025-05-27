import httpStatus from 'http-status';
import AppError from '../../error/appError';
import HazardVideo from '../hazard-video/hazard-video.model';
import { IHazardTest } from './hazard-test.interface';

function minuteSecondToSeconds(time: number): number {
    const minutes = Math.floor(time); // integer part = minutes
    const seconds = Math.round((time - minutes) * 100); // decimal part * 100 = seconds
    return minutes * 60 + seconds;
}

const createHazardTestResult = async (
    profileId: string,
    payload: IHazardTest & { submissions: number[] }
) => {
    const video = await HazardVideo.findById(payload.video);
    if (!video) {
        throw new AppError(httpStatus.NOT_FOUND, 'Video not found');
    }

    const dangerTimesInSeconds = video.dangerTimes.map(minuteSecondToSeconds);
    const submissionsInSeconds = payload.submissions.map(minuteSecondToSeconds);

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

    return {
        user: profileId,
        video: payload.video,
        rightSubmission,
        wrongSubmission,
        accuracy,
        totalDangerZone: video.dangerTimes.length,
        accuracyParcentage,
    };
};

const HazardTestService = {
    createHazardTestResult,
};

export default HazardTestService;
