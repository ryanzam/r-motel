import { NextResponse } from "next/server";
import prisma from "../../../../app/libs/prismadb";
import getSigninUser from "@/app/actions/getSignedinUser";
interface IParams {
    params: Promise<{ reservationId: string }>;
}

export async function DELETE(request: Request,
    context: IParams) {

    const signedinUser = await getSigninUser();

    if (!signedinUser) return NextResponse.error();

    const params = await context.params;
    const { reservationId } = params;

    if (!reservationId) throw new Error("Invalid reservationId");

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: signedinUser.id },
                {
                    listing: {
                        userId: signedinUser.id
                    }
                }
            ]
        }
    });
    return NextResponse.json(reservation);
}