<<<<<<< HEAD
import { Listing, Reservation, User } from "@/generated/prisma/client";
=======
import { Listing, Reservation, User } from "../../generated/prisma/client";
>>>>>>> d3106684811cb076ae928d15fb6ae800cda9b232

export type SafeUser = Omit<
    User, 'createdAt' | 'updatedAt' | 'emailVerified'
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null
};

export type SafeListing = Omit<
    Listing, 'createdAt'
> & {
    createdAt: string;
};

export type SafeReservation = Omit<
    Reservation, 'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
};