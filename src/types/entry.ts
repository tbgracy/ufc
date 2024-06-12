import { Challenger } from "./challenger";

export type Entry = {
    id: string;
    url: string;
    homepage: string;
    author: Challenger;
    createdAt?: string;
    voteCount: number;
    voted?: boolean;
}