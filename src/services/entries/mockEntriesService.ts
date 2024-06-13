import { Challenger } from "../../types/challenger";
import { Entry } from "../../types/entry";
import { getRandomNumberBetween } from "../../utils";
import IEntriesService from "./entriesServiceInterface";


export default class MockEntriesService implements IEntriesService {
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
        console.log(userId);
        
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
