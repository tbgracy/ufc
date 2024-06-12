import { IChallengerService } from "./challengerService";

import { Entry } from "../../types/entry";
import { Vote } from "../../types/vote";
import { Challenger } from "../../types/challenger";
import { getRandomNumberBetween } from "../../utils";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IAuthService } from "../authService";

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
    private authService: IAuthService;

    constructor(challengerService: IChallengerService, authService: IAuthService) {
        this.challengerService = challengerService;
        this.authService = authService;
    }

    private alreadyVoted(votes: Vote[]): boolean {
        const user = this.authService.getLocalUser();
        return Boolean(votes.find((v: Vote) => v.userId === user?.id))
    }

    private unvote() { }

    async vote(userId: string, entryId: string): Promise<Entry | Error> {
        // TODO : try catch
        try {
            const entryRef = doc(db, 'entries', entryId);
            const docSnap = await getDoc(entryRef);
            if (docSnap.exists()) {
                const entry = docSnap.data()
                const voted = this.alreadyVoted(entry.votes)
                if (!voted) {
                    entry.votes = [...entry.votes, {
                        userId: userId,
                        votingDate: (new Date()).toISOString(),
                    }]
                } else {
                    entry.votes = entry.votes.filter((v: Vote) => v.userId != userId)
                }
                setDoc(entryRef, entry);
                const updatedEntry = {
                    ...entry as Entry,
                    id: docSnap.id,
                    voteCount: entry.votes.length,
                    voted: !voted
                }
                
                return updatedEntry
            } else {
                return Error('Entry not found')
            }
        } catch (e) {
            console.log(e);
        }
        throw new Error("Method not implemented.");
    }

    async getEntries(): Promise<Entry[] | Error> {
        const challengers: Challenger[] = await this.challengerService!.getAllChallengers();

        const entries: Entry[] = [];

        const querySnapshot = await getDocs(collection(db, "entries"));

        querySnapshot.forEach(async (doc) => {
            const entry: Entry = {
                id: doc.id,
                url: doc.data().url,
                homepage: doc.data().homepage,
                author: challengers.find(e => e.username === doc.data().author)!,
                voteCount: doc.data().votes.length,
            }
            entry.voted = this.alreadyVoted(doc.data().votes)
            entries.push(entry)
        })

        return entries;
    }

}