import { IChallengerService } from "./challengerService";

import { Entry } from "../../types/entry";
import { Challenger } from "../../types/challenger";
import { getRandomNumberBetween } from "../../utils";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export interface IEntriesService {
    getEntries(): Promise<Entry[] | Error>;
    vote(userId: string, entryId: string): Promise<Entry | Error>;
}

export class MockEntriesService implements IEntriesService {
    async getEntries(): Promise<Entry[] | Error> {
        const entries: Entry[] = [];

        const challengers: Challenger[] = [
            {
                fullName: 'Gracy Tsierenana',
                profilePictureUrl: '',
            },
            {
                fullName: 'Glorio Tsierenana',
                profilePictureUrl: '',
            },
            {
                fullName: 'Ferson Tsierenana',
                profilePictureUrl: '',
            }
        ];

        for (let i = 0; i < 15; i++) {
            const entry = {
                id: `${i}`,
                url: 'https://gracy.com/',
                homepage: 'github.com',
                author: challengers[getRandomNumberBetween(0, challengers.length - 1)],
                voteCount: getRandomNumberBetween(0, 100),
            }

            entries.push(entry);
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(entries);
            }, 1000)
        })
    }

    async vote(userId: string, entryId: string): Promise<Entry | Error> {
        console.log('user id : ', userId);

        const votedEntry: Entry = {
            id: entryId,
            url: '',
            homepage: '',
            author: {
                fullName: 'Ferson Tsierenana',
                profilePictureUrl: '',

            },
            voteCount: getRandomNumberBetween(0, 100),
            voted: true,
        }

        return new Promise((resolve) => {
            entryId
            setTimeout(() => {
                resolve(votedEntry)
            }, 1000)
        })
    }
}

export default class EntriesService implements IEntriesService {
    private challengerService?: IChallengerService;

    constructor(challengerService: IChallengerService) {
        this.challengerService = challengerService;
    }

    async vote(userId: string, entryId: string): Promise<Entry | Error> {
        throw new Error("Method not implemented.");
    }

    async getEntries(): Promise<Entry[] | Error> {
        const challengers: Challenger[] = await this.challengerService!.getAllChallengers();
        
        const entries: Entry[] = [];

        const querySnapshot = await getDocs(collection(db, "entries"));

        querySnapshot.forEach(async (doc) => {
            const entry: Entry = {
                id: doc.data().id,
                url: doc.data().url,
                homepage: doc.data().homepage,
                author: challengers.find(e => e.username === doc.data().author)!,
                voteCount: 0,
            }
            entries.push(entry)
        })

        return entries;
    }

}