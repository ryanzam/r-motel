'use client'

import useLocation from "@/app/hooks/useLocation";
import { SafeUser } from "@/app/types";
import { FC } from "react";
import { IconType } from "react-icons";
import Image from "next/image";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), 
{
    ssr: false
});

interface IListingInfoProps {
    user?: SafeUser;
    description: string;
    roomNumber: number;
    guestNumber: number;
    bathroomNumber: number;
    locationValue: string;
    category: {
        icon: IconType;
        text: string;
        description: string;
    } | undefined
}

const ListingInfo:FC<IListingInfoProps> = ({ user, description, roomNumber, guestNumber, bathroomNumber, locationValue, category }) => {
    
    const { getCountryByValue } = useLocation();

    const coordinates = getCountryByValue(locationValue)?.latlng;
    
    return ( <div className="flex flex-col gap-6 col-span-4">
        <div className="flex flex-col gap-2">
            <div className="flex items-center">
                <div className="text-lg font-semibold">Offered by {user?.name}</div>
                <Image alt="avatar"
                    className="ml-2"
                    src={user?.image!}
                    height={20}
                    width={20}/>
            </div>

            <div className="text-neutral-400">
                <div className="text-sm">{guestNumber} guests {roomNumber} rooms {bathroomNumber} bathrooms</div>
            </div>
        </div>
        
        <hr/>
        {category && <ListingCategory icon={category.icon} text={category.text} description={category.description}/>}
        <hr />

        <div className="text-lg text-neutral-500">{description}</div>
        <hr/>

        <Map center={coordinates} />
    </div> );
}
 
export default ListingInfo;