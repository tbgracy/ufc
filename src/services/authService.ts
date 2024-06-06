import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Success } from "../types/success";
import { auth } from "./firebase";
import { User } from "../types/user";

import avatarPlaceholder from "../assets/images/avatar-placeholder.svg";
import { AuthProvider } from "../types/authProvider";

export interface IAuthService {
    loginWith(provider: AuthProvider): Promise<Error | string>;
    logout(): Promise<Error | Success>;
}

export class MockAuthService implements IAuthService {
    async loginWith(provider: AuthProvider): Promise<Error | string> {
        const user: User = {
            name: 'Tsierenana B. Gracy',
            profilePictureUrl: avatarPlaceholder,
            authProvider: provider,
        }
        localStorage.setItem('user', JSON.stringify(user))
        return 'User logged in';
    }

    async logout(): Promise<Error | Success> {
        localStorage.clear();
        return { message: 'Logout : success' };
    }
}

export class AuthService implements IAuthService {
    private providers = {
        'google': new GoogleAuthProvider(),
        'github': new GithubAuthProvider(),
    }

    async loginWith(provider: AuthProvider): Promise<Error | string> {
        try {
            console.log('logging in ... opening pupup ...');
            const result = await signInWithPopup(auth, this.providers[provider])
            console.log(result);
            localStorage.setItem('user', JSON.stringify({
                id: result.user.uid,
                name: result.user.displayName,
                profilePictureUrl: result.user.photoURL,
            }))
            return `User ${result.user.displayName} is successfully logged in.`;
        } catch (e) {
            console.error(e);
            return Error('An error has occured');
        }

    }

    logout(): Promise<Error | Success> {
        return auth.signOut().then(() => {
            localStorage.clear();
            return { message: 'Logged successfully' }
        }).catch((e) => {
            return Error(e)
        })
    }

}