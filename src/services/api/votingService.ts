import { addDoc, collection, getDocs } from "firebase/firestore";
import { Vote } from "../../types/vote";
import { db } from "../firebase";

export interface IVotingService {
    vote(userId: string, entryId: string): Promise<boolean>;
    unvote(userId: string, entryId: string): Promise<boolean>;
}

export class MockVotingService implements IVotingService {
    async vote(userId: string, entryId: string): Promise<boolean> {
        try {
            const votes: Vote[] = JSON.parse(localStorage.getItem('votes') ?? '');
            const newVotes: Vote[] = [...votes, {
                userId: userId,
                entryId: entryId,
                votingDate: Date.now().toString(),
            }]
            localStorage.setItem('votes', JSON.stringify(newVotes));
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async unvote(userId: string, entryId: string): Promise<boolean> {
        try {

            const votes: Vote[] = JSON.parse(localStorage.getItem('votes') ?? '');
            const newVotes: Vote[] = votes.filter(vote => {
                if (vote.userId != userId && vote.entryId != entryId) return true;
                else return false;
            })
            localStorage.setItem('votes', JSON.stringify(newVotes));
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

export class VotingService implements IVotingService {
    async vote(userId: string, entryId: string): Promise<boolean> {
        try {
            const newVote: Vote = {
                userId: userId,
                entryId: entryId,
                votingDate: Date.now().toString(),
            }

            await addDoc(collection(db, "votes"), newVote)

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
    async unvote(userId: string, entryId: string): Promise<boolean> {
        try {
            const querySnapshot = await getDocs(collection(db, "vote"));
            return true;
        } catch (e) {
            return false;
        }
    }
}