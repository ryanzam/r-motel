import { NextResponse } from "next/server";
import prisma from "../../../app/libs/prismadb";
import getSigninUser from "@/app/actions/getSignedinUser";

export async function POST(request: Request) {
    const signedinUser = await getSigninUser();
    
    if(!signedinUser) return NextResponse.error();

    const body = await request.json();

    const { listingId, startDate, endDate, totalPrice } = body;

    if(!listingId || !startDate || !endDate || !totalPrice) return NextResponse.error();

    const listingReservation = await prisma.listing.update({
        where: { id: listingId },
        data: {
            reservations: {
                create: {
                    userId: signedinUser.id,
                    startDate, 
                    endDate, 
                    totalPrice
                }
            }
        }
    });
    
    return NextResponse.json(listingReservation);
}