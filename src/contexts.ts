import { createContext } from "react";
import ChallengerService, { IChallengerService, MockChallengerService } from "./services/api/challengerService";
import EntriesService, { IEntriesService, MockEntriesService } from "./services/api/entriesService";
import { ILoginService, LoginService, MockLoginService } from "./services/loginService";

const inDevEnv = true;

type ServicesContextType = {
    challenger: IChallengerService,
    entry: IEntriesService,
    login: ILoginService,
}

export const initialValue = {
    challenger: inDevEnv ? new MockChallengerService() : new ChallengerService(),
    entry: inDevEnv ? new MockEntriesService() : new EntriesService(inDevEnv ? new MockChallengerService() : new ChallengerService()),
    login: inDevEnv ? new MockLoginService() : new LoginService(),
}

export const ServicesContext = createContext<ServicesContextType>(initialValue)