import { Challenger } from "./challenger";

export type Entry = {
    id: string;
    url: string;
    homepage: string;
    author: Challenger;
    voteCount: number;
    voted?: boolean;
}