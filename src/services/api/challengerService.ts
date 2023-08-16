import { Challenger } from "../../types/challenger";
import GithubAPIService from "../githubApi";
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default class ChallengerService {
    static async registerChallenger(githubCode: string): Promise<string> {
        const token = await GithubAPIService.getToken(githubCode);
        const userInfo = await GithubAPIService.getUserInfo(token);

        const user: Challenger = {
            name: userInfo.login,
            profileUurl: `https://github.com/${userInfo.login}`,
            pictureUrl: userInfo.avatar_url,
        }

        try {
            const querySnapshot = await getDocs(collection(db, "challengers"));
            for (const doc of querySnapshot.docs) {
                if (doc.data().name === user.name) {
                    return 'Vous êtes déjà inscrit !';
                }
            }

            await addDoc(collection(db, "challengers"), { ...user, createdAt: Timestamp.now() });
            return 'Vous êtes inscrit !';
        } catch (e) {
            console.error('Error adding document: ', e);
            return 'Une erreur est survenue, veuillez réessayer plus tard';
        }
    }

    static async getChallengerInfo() {


    }
}