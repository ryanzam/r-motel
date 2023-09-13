import {create} from "zustand";

interface ISigninModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onCloase: () => void;
}

const useSigninModal = create<ISigninModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onCloase: () => set({ isOpen: false})
}));

export default useSigninModal;