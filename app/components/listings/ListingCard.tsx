'use client';

import useLocation from "@/app/hooks/useLocation";
import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";
import Image from "next/image";
import ButtonHeart from "../buttons/ButtonHeart";
import Button from "../buttons/Button";

interface IListingCardProps {
    data: Listing;
    signedInUser?: SafeUser | null;
    disabled?: boolean;
    actionText?: string;
    actionId?: string;
    onAction?: (id: string) => void;
    reservation?: Reservation;
}

const ListingCard:FC<IListingCardProps> = ({ data, signedInUser, disabled, actionText, actionId = "", onAction, reservation }) => {

    const router = useRouter();
    const { getCountryByValue } = useLocation();

    const location = getCountryByValue(data.locationValue);

    const price = useMemo(() => {
        if(reservation) {
            return reservation.totalPrice;
        }
        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if(!reservation) 
            return null;

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, "PP")} - ${format(end, "PP")}`;
    },[reservation])

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if(disabled) return;

        onAction?.(actionId);
    }, [actionId, onAction, disabled]);

    return <div className="col-span-1 cursor-pointer group"
                onClick={() => router.push(`/listings/${data.id}`)}>
        <div className="w-full aspect-square relative rounded-lg overflow-hidden">
            <Image src={data.imageSrc}
                alt="listing"
                fill
                className="h-full w-full object-cover group-hover:scale-110 transition"/>

                <div className="">
                    <ButtonHeart listingId={data.id} signedInUser={signedInUser}/>
                </div>
        </div>
        <div className="text-lg font-semibold">
            {location?.label}, {location?.region}
        </div>
        <div className="font-light text-neutral-500">
            {reservationDate || data.category}
        </div>
        <div className="flex gap-1">
            <div className="font-semibold">€ {price}</div>
            {!reservation && <div className="font-light">/night</div>}
        </div>
        {onAction && actionText && <Button text={actionText} 
                                        disabled={disabled}
                                        onClick={handleCancel}/>}
    </div>
}
 
export default ListingCard;