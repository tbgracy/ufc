import { create } from 'zustand';

type State = {
    messages: string[]
}

type Action = {
    addMessage: (message: string) => void,
}

export const useErrorMessageStore = create<State & Action>((set) => {
    function addMessage(message: string) {
        set((state) => ({ messages: [...state.messages, message] }));

        setTimeout(() => {
            set((state) => ({ messages: [...state.messages.slice(0, -1)] }))
        }, 3000);
    }

    return {
        messages: [],
        addMessage: addMessage
    }
});