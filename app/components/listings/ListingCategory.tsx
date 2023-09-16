import { FC } from "react";
import { IconType } from "react-icons";

interface IListingCategoryProps {
    text: string;
    icon: IconType;
    description?: string;
}

const ListingCategory:FC<IListingCategoryProps> = ({ text, icon: Icon, description }) => {
    return ( <div className="flex flex-col gap-6">
        <div className="flex items-center">
            <Icon className="text-neutral-700" size={30}/>
            <div className="flex flex-col ml-2">
                <div className="text-lg font-semibold">{text}</div>
                <div className="text-neutral-400 font-light">{description}</div>
            </div>
        </div>
    </div>);
}
 
export default ListingCategory;