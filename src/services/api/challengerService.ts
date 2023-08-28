import { Challenger } from "../../types/challenger";
import GithubAPIService from "../githubApi";
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default class ChallengerService {

    private static async isChallengerAlreadyRegistered(name: string): Promise<boolean> {
        const challengers = await this.getAllChallengers();

        for (const challenger of challengers) {
            if (challenger.name === name) {
                return true;
            }
        }

        return false;
    }

    static async getAllChallengers(): Promise<Challenger[]> {
        const challengers: Challenger[] = [];

        const querySnapshot = await getDocs(collection(db, "challengers"));

        querySnapshot.forEach(async (doc) => {
            const challenger: Challenger = {
                id: doc.id,
                name: doc.data().name,
                profileUurl: `https://github.com/${doc.data().name}`,
                pictureUrl: doc.data().pictureUrl,
            }

            challengers.push(challenger);
        });

        return challengers;
    }

    static async registerChallenger(githubCode: string): Promise<string> {
        const token = await GithubAPIService.getToken(githubCode);
        const userInfo = await GithubAPIService.getUserInfo(token);

        const user: Challenger = {
            name: userInfo.login,
            profileUurl: `https://github.com/${userInfo.login}`,
            pictureUrl: userInfo.avatar_url,
        }

        try {
            if (await this.isChallengerAlreadyRegistered(user.name))
                return 'Vous êtes déjà inscrit(e) !';

            await addDoc(collection(db, "challengers"), { ...user, createdAt: Timestamp.now() });

            return 'Vous êtes inscrit !';
        } catch (e) {
            console.error('Error adding document: ', e);
            return 'Une erreur est survenue, veuillez réessayer plus tard';
        }
    }
}