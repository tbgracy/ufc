import GithubAPIService from "../githubApi";
import { ChallengerService } from ".";

import { Entry } from "../../types/entry";
import { Challenger } from "../../types/challenger";
import isFromThisWeek from "../../utils/isFromThisWeek";

export default class EntriesService {

    static async getWeeksEntries() {
        const entries: Entry[] = [];

        const challengers: Challenger[] = await ChallengerService.getAllChallengers();
        for (const challenger of challengers) {
            const repos = await GithubAPIService.getRepos(challenger.name);

            const thisWeeksRepo = repos.filter(repo => {
                const createdThisWeek: boolean = isFromThisWeek(new Date(repo.created_at));
                const hasUfcInName: boolean = repo.name.includes('ufc');

                return createdThisWeek && hasUfcInName;
            });

            if (thisWeeksRepo.length === 0) { continue; }
            else {
                thisWeeksRepo.forEach((repo) => {

                    const entry: Entry = {
                        id: challenger.id ?? '',
                        url: repo.url,
                        homepage: repo.homepage,
                        author: challenger,
                    }

                    entries.push(entry);
                })
            }
        }

        return entries;
    }

}