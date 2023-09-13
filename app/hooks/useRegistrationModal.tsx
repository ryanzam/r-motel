import {create} from "zustand";

interface IRegistrationModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onCloase: () => void;
}

const useRegistrationModal = create<IRegistrationModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onCloase: () => set({ isOpen: false})
}));

export default useRegistrationModal;