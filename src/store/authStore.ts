import { create } from 'zustand';
import { User } from '../types/user';

type State = {
    user?: User
}

type Action = {
    updateUser: (user?: User) => void
}

export const useAuthStore = create<State & Action>((set) => {
    const userFromLocalStorage = localStorage.getItem('user');
    const user = userFromLocalStorage != null ? JSON.parse(userFromLocalStorage) : undefined;
    
    return {
        user: user,
        updateUser: (user?: User) => set(() => ({ user: user }))
    };
})