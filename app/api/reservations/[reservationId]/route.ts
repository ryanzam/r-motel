import { NextResponse } from "next/server";
import prisma from "../../../../app/libs/prismadb";
import getSigninUser from "@/app/actions/getSignedinUser";

interface IParams {
    reservationId?: string;
}

export async function DELETE(request: Request, 
    { params }: { params: IParams }) {

    const signedinUser = await getSigninUser();
    
    if(!signedinUser) return NextResponse.error();

    const {reservationId} = params;

    if(!reservationId) throw new Error("Invalid reservationId");

    const reservation = await prisma.reservation.deleteMany({
        where: { id: reservationId,
            OR: [
                { userId: signedinUser.id },
                { listing: {
                    userId: signedinUser.id
                }}
            ]
        }
    });
    return NextResponse.json(reservation);
}