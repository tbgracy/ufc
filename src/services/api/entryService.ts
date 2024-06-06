import GithubAPIService from "../githubApi";
import { IChallengerService } from "./challengerService";

import { Entry } from "../../types/entry";
import { Challenger } from "../../types/challenger";
import { isFromThisWeek, getRandomNumberBetween } from "../../utils";

export interface IEntryService {
    getWeeksEntries(): Promise<Entry[] | Error>;
}

export class MockEntryService implements IEntryService {
    async getWeeksEntries(): Promise<Entry[] | Error> {
        const entries: Entry[] = [];

        const challengers: Challenger[] = [
            {
                id: 'faljkjlkasdf',
                name: 'Gracy Tsierenana',
                profileUrl: '',
                profilePictureUrl: '',
                authProvider: 'google',
            },
            {
                id: 'jlkjaljdlf',
                name: 'Glorio Tsierenana',
                profileUrl: '',
                profilePictureUrl: '',
                authProvider: 'google',
            },
            {
                id: 'jlajlkjdlkjfladsjf',
                name: 'Ferson Tsierenana',
                profileUrl: '',
                profilePictureUrl: '',
                authProvider: 'google',
            }
        ];

        for (let i = 0; i < 15; i++) {
            const entry = {
                id: `${i}`,
                url: 'https://gracy.com/',
                homepage: 'github.com',
                author: challengers[getRandomNumberBetween(0, challengers.length - 1)]
            }

            entries.push(entry);
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(entries);
            }, 1000)
        })
    }

}

export default class EntryService implements IEntryService {
    private challengerService?: IChallengerService;

    constructor(challengerService: IChallengerService) {
        this.challengerService = challengerService;
    }

    async getWeeksEntries(): Promise<Entry[] | Error> {
        const entries: Entry[] = [];

        const challengers: Challenger[] = await this.challengerService!.getAllChallengers();

        for (const challenger of challengers) {
            const repos = await GithubAPIService.getRepos(challenger.name);
            
            const thisWeeksRepo = repos.filter(repo => {
                const createdThisWeek: boolean = isFromThisWeek(new Date(repo.created_at));
                const hasUfcInName: boolean = repo.name.toLowerCase().includes('ufc');

                return createdThisWeek && hasUfcInName;
            });

            if (thisWeeksRepo.length === 0) { continue; }
            else {
                thisWeeksRepo.forEach((repo) => {
                    // TODO : check if it's already in database, if it's not save there
                    const entry: Entry = {
                        // TODO : tsy tokony vide id ito
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