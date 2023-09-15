import {create} from "zustand";

interface IRentModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onCloase: () => void;
}

const useRentModal = create<IRentModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onCloase: () => set({ isOpen: false})
}));

export default useRentModal;