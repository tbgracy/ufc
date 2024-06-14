import { createContext } from "react";
import authService from "../services/auth";
import entriesService from "../services/entries";
import challengerService from "../services/challengers"
import IChallengerService from "../services/challengers/challengersServiceInterface";
import IEntriesService from "../services/entries/entriesServiceInterface";
import IAuthService from "../services/auth/authServiceInterface";
import RankingService from "../services/rankingService";

type ServicesContextType = {
    challenger: IChallengerService,
    entry: IEntriesService,
    auth: IAuthService,
    ranking: RankingService,
}

export const initialValue = {
    challenger: challengerService,
    entry: entriesService,
    auth: authService,
    ranking: new RankingService(challengerService),
}

export const ServicesContext = createContext<ServicesContextType>(initialValue)