import { SafeUser } from "@/app/types";
import { FC } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface IButtonHeartProps {
    listingId: string;
    signedInUser?: SafeUser | null;
}

const ButtonHeart:FC<IButtonHeartProps> = ({ listingId, signedInUser }) => {

    const isFavorite = false;
    
    const toggleFavorite = () => {}

    return (<div onClick={toggleFavorite} 
        className="relative cursor-pointer hover:opacity-50 transition">
            { isFavorite ? <AiFillHeart size={28} className="m-1 fill-blue-500"/> : <AiOutlineHeart size={28} className="m-1"/>}      
    </div>)
}
 
export default ButtonHeart;