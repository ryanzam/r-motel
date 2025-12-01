'use client';

import Container from "@/app/components/Container";
import ButtonHeart from "@/app/components/buttons/ButtonHeart";
import useLocation from "@/app/hooks/useLocation";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import Image from "next/image";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import ListingInfo from "../../components/listings/ListingInfo";
import useSigninModal from "@/app/hooks/useSigninModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { Range } from "react-date-range";
import { categories } from "@/app/components/navbar/CategoriesClient";

const initDateRng = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
}

interface IListingProps {
    listing: SafeListing & { user: SafeUser}
    signedInuser?: SafeUser | null;
    reservations: SafeReservation[];
}

const Listing:FC<IListingProps> = ({ listing, signedInuser, reservations = [] }) => {

    const [loading, setLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initDateRng);

    const { getCountryByValue } = useLocation();

    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate) {
            const daysCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);
            if(daysCount && listing.price) {
                setTotalPrice(listing.price * daysCount);
            } else {
                setTotalPrice(listing.price)
            }
        }
    }, [dateRange, listing.price]);

    const location = getCountryByValue(listing.locationValue);

    const category = useMemo(() => {
        return categories.find((item) => item.text === listing.category)
    }, [listing.category]);

    const signinModal = useSigninModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((res) => {
            const range = eachDayOfInterval({
                start: new Date(res.startDate),
                end: new Date(res.endDate)
            });
            dates = [...dates, ...range]
        });
        return dates;
    },[reservations])

    const onCreateReservations = useCallback(() => {
        if(!signedInuser) return signinModal.onOpen();

        setLoading(true);
        axios.post("/api/reservations", {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing.id
        }).then(() =>{
            toast.success("Listing is reserved.")
            setDateRange(initDateRng);
            router.push("/visits")
        }).catch((error) => {
            toast.error(error.message);
        }).finally(() => {
            setLoading(false);
        })
    }, [totalPrice, dateRange, signinModal, listing?.id, router, signedInuser]) 

    return <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-5">
                <div className="font-bold text-xl">{listing.title}</div>
                
                <div>{location?.label}, {location?.region}</div>
                
                <div className="relative w-full h-[60vh] rounded-lg overflow-hidden">
                    <Image src={listing.imageSrc}
                        alt="image"
                        fill
                        className="w-full"/>
                    <div className="absolute ">
                        <ButtonHeart listingId={listing.id} signedInUser={signedInuser}/>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-8 mt-5">
                    <ListingInfo user={listing.user}
                        category={category}
                        guestNumber={listing.guestCount}
                        roomNumber={listing.roomCount}
                        bathroomNumber={listing.bathroomCount}
                        description={listing.description}
                        locationValue={listing.locationValue}/>
                        
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value) } 
                                disabled={loading}
                                dateRange={dateRange}
                                onSubmit={onCreateReservations}
                                disabledDates={disabledDates} />
                        </div>
                </div>
            </div>
        </div>
    </Container>
}
 
export default Listing;