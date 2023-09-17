"use client"

import { FC, useCallback, useState } from "react";
import { SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface IReservationProps {
    reservations: SafeReservation[];
    signedInUser?: SafeUser | null;
}

const Reservations:FC<IReservationProps> = ({ reservations, signedInUser }) => {

    const [deletingId, setDeletingId] = useState("");
    
    const router = useRouter();

    const handleCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reservation cancelled.")
                router.refresh();
            }).catch((error) => {
                toast.error(error.message);
            }).finally(() => {
                setDeletingId("")
            });
    }, [router]);
    
    return (<Container>
        <div className="text-lg font-bold py-4">My All Reservations</div>
        <div className="grid grid-cols-1 sm:grid-cols-12 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {reservations.map((rsv) => (
                <ListingCard key={rsv.id} 
                    data={rsv.listing}
                    signedInUser={signedInUser}
                    actionId={rsv.id}
                    actionText="Cancel reservation"
                    reservation={rsv}
                    onAction={handleCancel}
                    disabled={deletingId === rsv.id}/>
            ))}
        </div>
    </Container>);
}
 
export default Reservations