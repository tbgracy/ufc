import { Challenger } from "../../types/challenger";
import GithubAPIService from "../githubApi";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default class ChallengerService {
    static async registerChallenger(githubCode: string) {
        const token = await GithubAPIService.getToken(githubCode);
        const userInfo = await GithubAPIService.getUserInfo(token);
        const user: Challenger = {
            name: userInfo.login,
            profileUurl: `https://github.com/${userInfo.login}`,
            pictureUrl: userInfo.avatar_url,
        }

        await addDoc(collection(db, "challengers"), user);
    }

    static async getChallengerInfo() {


    }
}