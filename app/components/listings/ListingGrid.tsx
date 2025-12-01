'use client';

import { useSearchParams } from "next/navigation";
import { use } from "react";
import getListings from "@/app/actions/getListings";
import ListingCard from "./ListingCard";
import getSigninUser from "@/app/actions/getSignedinUser";

const ListingGrid = () => {

    const searchParams = useSearchParams();
    // Convert searchParams to plain object safely
    const userId = searchParams?.get("userId") || undefined;
    //const category = searchParams?.get("category") || undefined;

    const listings = use(getListings({ userId }));

    const signedInUser = use(getSigninUser());

    if (!listings || listings.length === 0) {
        return <div className="text-center py-10">No listings found</div>;
    }

    return (
        <div>
            {listings.map(listing => {
                return <ListingCard key={listing.id} data={listing} signedInUser={signedInUser} />
            })}
        </div>
    )
}

export default ListingGrid