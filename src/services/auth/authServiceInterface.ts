import { AuthProvider } from "../../types/authProvider";
import { Success } from "../../types/success";
import { User } from "../../types/user";

export default interface IAuthService {
    loginWith(provider: AuthProvider): Promise<Error | string>;
    logout(): Promise<Error | Success>;
    getLocalUser(): User | undefined;
}

export const getLocalUser = (): User | undefined => {
    try {
        const user = JSON.parse(localStorage.getItem('user')!)
        return user
    } catch {
        return undefined
    }
}