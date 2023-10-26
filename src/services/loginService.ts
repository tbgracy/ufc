import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { Success } from "../types/success";
import { getGitHubUrl } from "../utils";
import { auth } from "./firebase";
import { Challenger } from "../types/challenger";
import { Voter } from "../types/voter";


export interface ILoginService {
    loginAs(role: 'challenger' | 'voter'): Promise<Error | string>;
    logout(): Promise<Error | Success>;
}

export class MockLoginService implements ILoginService {
    async loginAs(role: 'challenger' | 'voter'): Promise<Error | string> {
        let user: Challenger | Voter;
        if (role == 'challenger') {
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
    private async challengerLogin() {
        window.location.href = getGitHubUrl();
        return Error('Method not implemented')
    }

    private async voterLogin() {
        const provider = new FacebookAuthProvider();
        console.log(provider);

        provider.setCustomParameters({
            'display': 'popup'
        });

        try {
            const result = await signInWithPopup(auth, provider);
            return `User ${result.user.displayName} is successfully logged in.`;
        } catch (e) {
            console.error(e);
            return Error('An error has occured');
        }
    }

    async loginAs(role: 'challenger' | 'voter'): Promise<Error | string> {
        if (role == 'challenger') {
            return this.challengerLogin();
        } else {
            return this.voterLogin();
        }
    }

    logout(): Promise<Error | Success> {
        throw new Error("Method not implemented.");
    }

}