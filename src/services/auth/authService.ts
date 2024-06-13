import { Timestamp, addDoc, collection } from "firebase/firestore";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth, db } from "../firebase";
import { User } from "../../types/user";
import { Success } from "../../types/success";
import { Challenger } from "../../types/challenger";
import { AuthProvider } from "../../types/authProvider";
import IAuthService, { getLocalUser } from "./authServiceInterface";
import IChallengerService from "../challengers/challengersServiceInterface";


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