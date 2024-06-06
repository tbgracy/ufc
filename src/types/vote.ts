export interface Vote {
    userId: string,
    entryId: string,
    votingDate: string, // ISO format
}

export interface Votes {
    entryId: string,
    userId: string[],
}