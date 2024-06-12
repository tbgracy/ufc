import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Success } from "../types/success";
import { auth, db } from "./firebase";
import { User } from "../types/user";

import avatarPlaceholder from "../assets/images/avatar-placeholder.svg";
import { AuthProvider } from "../types/authProvider";
import { nanoid } from "@reduxjs/toolkit";
import { IChallengerService } from "./api/challengerService";
import { Challenger } from "../types/challenger";
import { Timestamp, addDoc, collection } from "firebase/firestore";

export interface IAuthService {
    loginWith(provider: AuthProvider): Promise<Error | string>;
    logout(): Promise<Error | Success>;
    getLocalUser(): User | undefined;
}

const getLocalUser = (): User | undefined => {
    try {
        const user = JSON.parse(localStorage.getItem('user')!)
        return user
    } catch {
        return undefined
    }
}

export class MockAuthService implements IAuthService {
    async loginWith(provider: AuthProvider): Promise<Error | string> {
        console.log(`Login in with ${provider}`);

        const user: User = {
            id: nanoid(),
            fullName: 'Tsierenana B. Gracy',
            profilePictureUrl: avatarPlaceholder,
        }
        localStorage.setItem('user', JSON.stringify(user))
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return 'User logged in';
    }

    async logout(): Promise<Error | Success> {
        localStorage.clear();
        return { message: 'Logout : success' };
    }

    getLocalUser(): User | undefined {
        return getLocalUser()
    }
}

export class AuthService implements IAuthService {
    private challengerService: IChallengerService;

    constructor(challengerService: IChallengerService) {
        this.challengerService = challengerService;
    }

    private providers = {
        'google': new GoogleAuthProvider(),
        'github': new GithubAuthProvider(),
    }

    private async register(challenger: Challenger): Promise<void> {
        await addDoc(collection(db, "challengers"), { ...challenger, createdAt: Timestamp.now() })
    }

    private saveToLocalStorage(challenger: Challenger) {
        localStorage.setItem('user', JSON.stringify(challenger))
    }

    private async getGithubUsername(numericId: string): Promise<string> {
        const response = await fetch(`https://api.github.com/user/${numericId}`)
        const parsedResponse = await response.json()
        return parsedResponse.login
    }

    async loginWith(provider: AuthProvider): Promise<Error | string> {
        try {
            console.log('logging in ... opening pupup ...');
            
            const result = await signInWithPopup(auth, this.providers[provider]);

            // update entry list
            fetch('https://ufc-github-auth.onrender.com/update-entries')
            
            const username = (await this.getGithubUsername(result.user.providerData[0].uid))

            const user: Challenger = {
                id: result.user.uid,
                fullName: result.user.displayName!,
                username,
                profilePictureUrl: result.user.photoURL!,
            }

            const challengers = await this.challengerService.getAllChallengers();

            const alreadyRegistered = Boolean(challengers.find(e => e.id === result.user.uid))

            if (!alreadyRegistered) {
                this.register(user)
            }

            this.saveToLocalStorage(user)

            return `User ${result.user.displayName} is successfully logged in.`;
        } catch (e) {
            console.error(e);
            return Error('An error has occured');
        }

    }

    async logout(): Promise<Error | Success> {
        return auth.signOut().then(() => {
            localStorage.clear();
            return { message: 'Logged successfully' }
        }).catch((e) => {
            return Error(e)
        })
    }

    getLocalUser(): User | undefined {
        return getLocalUser()
    }

}