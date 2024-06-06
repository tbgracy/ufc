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

export const initialValue = {
    challenger: inDevEnv ? new MockChallengerService() : new ChallengerService(),
    entry: inDevEnv ? new MockEntriesService() : new EntriesService(inDevEnv ? new MockChallengerService() : new ChallengerService()),
    login: inDevEnv ? new MockAuthService() : new AuthService(),
    ranking: inDevEnv ? new MockRankingService() : new RankingService(),
}

export const ServicesContext = createContext<ServicesContextType>(initialValue)