import { Entry } from "../../types/entry";

export default interface IEntriesService {
    getEntries(): Promise<Entry[] | Error>;
    vote(userId: string, entryId: string): Promise<Entry | Error>;
}