import { nanoid } from "@reduxjs/toolkit";
import { Success } from "../../types/success";
import IAuthService, { getLocalUser } from "./authServiceInterface";
import avatarPlaceholder from "../../assets/images/avatar-placeholder.svg";
import { AuthProvider } from "../../types/authProvider";
import { User } from "../../types/user";

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
