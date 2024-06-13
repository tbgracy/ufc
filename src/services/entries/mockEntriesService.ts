import { Challenger } from "../../types/challenger";
import { Entry } from "../../types/entry";
import { getRandomNumberBetween } from "../../utils";
import IEntriesService from "./entriesServiceInterface";


export default class MockEntriesService implements IEntriesService {
    async getEntries(): Promise<Entry[] | Error> {
        const entries: Entry[] = [];

        const challengers: Challenger[] = [
            {
                fullName: 'John Doe',
                profileUrl: 'https://example.com',
            },
            {
                fullName: 'Jane Doe',
                profileUrl: 'https://example.com',
            },
            {
                fullName: 'Miyamoto Musashi',
                profileUrl: 'https://example.com',
            }
        ];

        const homepages = [
            "https://example.com",
            "https://tbgracy.netlify.app",
            undefined,
            undefined,
        ]

        for (let i = 0; i < 15; i++) {
            const entry = {
                id: `${i}`,
                url: 'https://gracy.com/',
                homepage: homepages[getRandomNumberBetween(0, homepages.length - 1)],
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
            author: {
                fullName: 'Jane Doe',
                profileUrl: 'https://example.com',
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
