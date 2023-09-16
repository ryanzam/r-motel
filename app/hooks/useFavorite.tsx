import { FC, useCallback, useMemo } from "react";
import { SafeUser } from "../types";
import { useRouter } from "next/navigation";
import useSigninModal from "./useSigninModal";
import axios from "axios";
import toast from "react-hot-toast";

interface IUseFavorite {
    listingId: string;
    signedInUser?: SafeUser | null;
}

const useFavorite = ({ listingId, signedInUser }: IUseFavorite) => {
    
    const router = useRouter();
    const signInModal = useSigninModal();

    const isAlreadyFavorite = useMemo(() => {
        const favList = signedInUser?.favoriteIds || []
        return favList.includes(listingId);
    }, [signedInUser, listingId])

    const toggleFavorite = useCallback(async(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        
        if(!signedInUser) 
            return signInModal.onOpen();

        try {
            let req;
            if(isAlreadyFavorite) {
                req = () => axios.delete(`/api/favorites/${listingId}`);
                toast.success("Favorite removed!");
            } else {
                req = () => axios.post(`/api/favorites/${listingId}`);
                toast.success("Favorite added!");
            }
            await req();
            router.refresh();
        } catch (error: any) {
            toast.error(error);
        }
    },[listingId, isAlreadyFavorite, signInModal, signedInUser, router])

    return {
        isAlreadyFavorite, toggleFavorite
    }
}
 
export default useFavorite;