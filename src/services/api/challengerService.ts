import { Challenger } from "../../types/challenger";
import GithubAPIService from "../githubApi";
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export interface IChallengerService {
    getAllChallengers(): Promise<Challenger[]>;
    registerChallenger(githubCode: string): Promise<string | Error>;
}

export class MockChallengerService implements IChallengerService {
    getAllChallengers(): Promise<Challenger[]> {
        throw new Error("Method not implemented.");
    }
    registerChallenger(githubCode: string): Promise<string> {
        console.log(githubCode);
        
        throw new Error("Method not implemented.");
    }

}

export default class ChallengerService implements IChallengerService {

    private async isChallengerAlreadyRegistered(name: string): Promise<boolean> {
        const challengers = await this.getAllChallengers();

        for (const challenger of challengers) {
            if (challenger.name === name) {
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
                id: doc.id,
                name: doc.data().name,
                profileUrl: `https://github.com/${doc.data().name}`,
                profilePictureUrl: doc.data().pictureUrl,
            }

            challengers.push(challenger);
        });

        return challengers;
    }

    async registerChallenger(githubCode: string): Promise<string | Error> {
        const token = await GithubAPIService.getToken(githubCode);
        const userInfo = await GithubAPIService.getUserInfo(token);

        const user: Challenger = {
            name: userInfo.login,
            profileUrl: `https://github.com/${userInfo.login}`,
            profilePictureUrl: userInfo.avatar_url,
        }

        try {
            if (await this.isChallengerAlreadyRegistered(user.name))
                return Error('Vous êtes déjà inscrit(e) !');

            await addDoc(collection(db, "challengers"), { ...user, createdAt: Timestamp.now() });

            return 'Vous êtes inscrit !';
        } catch (e) {
            console.error('Error adding document: ', e);
            return 'Une erreur est survenue, veuillez réessayer plus tard';
        }
    }
}