import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";
import { FC } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface IButtonHeartProps {
    listingId: string;
    signedInUser?: SafeUser | null;
}

const ButtonHeart:FC<IButtonHeartProps> = ({ listingId, signedInUser }) => {

    const { isAlreadyFavorite, toggleFavorite } = useFavorite({
        listingId, signedInUser
    });

    return (<div onClick={toggleFavorite} 
        className="relative cursor-pointer hover:opacity-50 transition">
            { isAlreadyFavorite ? <AiFillHeart size={30} className="m-1 fill-blue-600 outline-black"/> : <AiOutlineHeart size={30} className="m-1"/>}      
    </div>)
}
 
export default ButtonHeart;