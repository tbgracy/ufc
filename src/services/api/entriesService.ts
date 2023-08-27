import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";

import GithubAPIService from "../githubApi";

import { Entry } from "../../types/entry";
import { Challenger } from "../../types/challenger";
import isFromThisWeek from "../../utils/isFromThisWeek";

export default class EntriesService {
    static async getWeeksEntries() {
        const entries: Entry[] = [];
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

        for (const challenger of challengers) {
            const repos = await GithubAPIService.getRepos(challenger.name);

            const thisWeeksRepo = repos.filter(repo => {
                const createdThisWeek: boolean = isFromThisWeek(new Date(repo.created_at));
                const hasUfcInName: boolean = repo.name.includes('ufc');

                return createdThisWeek && hasUfcInName;
            })[0];

            const entry: Entry = {
                id: challenger.id ?? '',
                url: thisWeeksRepo.url,
                homepage: thisWeeksRepo.homepage,
                author: challenger,
            }

            entries.push(entry);
        }

        return entries;
    }

}