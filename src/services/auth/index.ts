import challengerService from "../challengers";
import { MockAuthService } from "./mockAuthService";
import { AuthService } from "./authService";

const inDevEnv = import.meta.env.VITE_DEV as string == '1' ? true : false;

const authService = inDevEnv ? new MockAuthService() : new AuthService(challengerService)

export default authService;
