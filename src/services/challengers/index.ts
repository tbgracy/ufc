import ChallengerService from "./challengerService";
import MockChallengerService from "./mockChallengersService";

const inDevEnv = import.meta.env.VITE_DEV as string == '1' ? true : false;

const challengerService = inDevEnv ? new MockChallengerService() : new ChallengerService()

export default challengerService;
