import { create } from 'zustand';

type State = {
    message?: string
}

type Action = {
    setMessage: (message: string) => void,
    deleteMessage: () => void,
}

export const useErrorMessageStore = create<State & Action>((set) => {
    function setMessage(message: string) {
        set(() => ({ message: message }));

        setTimeout(() => {
            set(() => ({ message: undefined }))
        }, 2000);
    }

    return {
        // setMessage: (message: string) => set(() => ({ message: message })),
        setMessage: setMessage,
        deleteMessage: () => set(() => ({ message: undefined })),
    }
});