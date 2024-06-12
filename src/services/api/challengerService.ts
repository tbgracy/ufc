import { Challenger } from "../../types/challenger";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export interface IChallengerService {
    getAllChallengers(): Promise<Challenger[]>;
}

export class MockChallengerService implements IChallengerService {
    getAllChallengers(): Promise<Challenger[]> {
        throw new Error("Method not implemented.");
    }
}

export default class ChallengerService implements IChallengerService {
    private async isChallengerAlreadyRegistered(name: string): Promise<boolean> {
        const challengers = await this.getAllChallengers();

        for (const challenger of challengers) {
            if (challenger.fullName === name) {
                return true;
            }
        }
        return false;
    }

    async getAllChallengers(): Promise<Challenger[]> {
        const challengers: Challenger[] = [];

        const querySnapshot = await getDocs(collection(db, "challengers"));

        querySnapshot.forEach(async (doc) => {
            const challenger: Challenger = {
                id: doc.data().id,
                fullName: doc.data().fullName,
                profilePictureUrl: doc.data().profilePictureUrl,
                profileUrl: `https://github.com/${doc.data().username}`,
                username: doc.data().username,
            }

            challengers.push(challenger);
        });

        return challengers;
    }
}