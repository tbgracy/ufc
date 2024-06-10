import { Success } from "../../types/success";

export interface IVotingService {
    vote(userId: string, entryId: string): Promise<Success | Error>;
}