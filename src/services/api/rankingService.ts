import { RankedUser } from "../../types/rankedUser";

export interface IRankingService {
    getWeeklyRanking(): Promise<RankedUser[] | Error>;
    getAllTimeRanking(): Promise<RankedUser[] | Error>;
}

export class MockRankingService implements IRankingService {
    // should return ranked user sorted by points
    async getWeeklyRanking(): Promise<RankedUser[] | Error> {
        throw Error('Method unimplemented');
    }

    async getAllTimeRanking(): Promise<RankedUser[] | Error> {
        throw Error('Method unimplemented');
    }
}

export class RankingService implements IRankingService {
    getWeeklyRanking(): Promise<RankedUser[] | Error> {
        throw new Error("Method not implemented.");
    }
    getAllTimeRanking(): Promise<RankedUser[] | Error> {
        throw new Error("Method not implemented.");
    }
}