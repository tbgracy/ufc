import { createContext } from "react";
import ChallengerService, { IChallengerService, MockChallengerService } from "../services/api/challengerService";
import EntriesService, { IEntriesService, MockEntriesService } from "../services/api/entriesService";
import { IAuthService, AuthService, MockAuthService } from "../services/authService";
import { IRankingService, MockRankingService, RankingService } from "../services/api/rankingService";

const inDevEnv = import.meta.env.VITE_DEV as string == '1' ? true : false;

type ServicesContextType = {
    challenger: IChallengerService,
    entry: IEntriesService,
    login: IAuthService,
    ranking: IRankingService,
}

const challengerService = new ChallengerService()
const authService = new AuthService(challengerService)

export const initialValue = {
    challenger: inDevEnv ? new MockChallengerService() : new ChallengerService(),
    entry: inDevEnv ? new MockEntriesService() : new EntriesService(challengerService, authService),
    login: inDevEnv ? new MockAuthService() : authService,
    ranking: inDevEnv ? new MockRankingService() : new RankingService(),
}

export const ServicesContext = createContext<ServicesContextType>(initialValue)