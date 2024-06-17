import { Entry } from "../../types/entry";
import { Vote } from "../../types/vote";
import { Challenger } from "../../types/challenger";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import IChallengerService from "../challengers/challengersServiceInterface";
import IEntriesService from "./entriesServiceInterface";
import IAuthService from "../auth/authServiceInterface";

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

    async vote(userId: string, entryId: string): Promise<Entry | Error> {
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
                createdAt: doc.data().createdAt
            }
            entry.voted = this.alreadyVoted(doc.data().votes)
            entries.push(entry)
        })

        return entries;
    }

}