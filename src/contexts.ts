import { createContext } from "react";
import ChallengerService, { IChallengerService, MockChallengerService } from "./services/api/challengerService";
import EntriesService, { IEntriesService, MockEntriesService } from "./services/api/entriesService";
import { IAuthService, AuthService, MockAuthService } from "./services/authService";

const inDevEnv = false;

type ServicesContextType = {
    challenger: IChallengerService,
    entry: IEntriesService,
    login: IAuthService,
}

export const initialValue = {
    challenger: inDevEnv ? new MockChallengerService() : new ChallengerService(),
    entry: inDevEnv ? new MockEntriesService() : new EntriesService(inDevEnv ? new MockChallengerService() : new ChallengerService()),
    login: inDevEnv ? new MockAuthService() : new AuthService(),
}

export const ServicesContext = createContext<ServicesContextType>(initialValue)