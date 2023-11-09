import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Success } from "../types/success";
import { auth } from "./firebase";
import { Challenger } from "../types/challenger";
import { Voter } from "../types/voter";


export interface ILoginService {
    loginWith(provider: 'github' | 'google'): Promise<Error | string>;
    logout(): Promise<Error | Success>;
}

export class MockLoginService implements ILoginService {
    async loginWith(provider: 'github' | 'google'): Promise<Error | string> {
        let user: Challenger | Voter;
        if (provider == 'github') {
            user = {
                name: '',
                profileUrl: '',
                profilePictureUrl: '',
            }
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            user = {
                name: '',
                profileUrl: '',
                profilePictureUrl: '',
            }
        }

        return 'User logged in';
    }

    async logout(): Promise<Error | Success> {
        localStorage.clear();
        return Error('');
    }
}

export class LoginService implements ILoginService {
    private providers = {
        'google': new GoogleAuthProvider(),
        'github': new GithubAuthProvider(),
    }

    async loginWith(provider: 'github' | 'google'): Promise<Error | string> {
        try {
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