import { NextResponse } from "next/server";
import prisma from "../../../../app/libs/prismadb";
import getSigninUser from "@/app/actions/getSignedinUser";
<<<<<<< HEAD


export async function DELETE(request: Request,
    { params }: { params: Promise<{ reservationId: string }> }) {
=======
interface IParams {
    params: Promise<{ reservationId: string }>;
}

export async function DELETE(request: Request,
    context: IParams) {
>>>>>>> d3106684811cb076ae928d15fb6ae800cda9b232

    const signedinUser = await getSigninUser();

    if (!signedinUser) return NextResponse.error();

<<<<<<< HEAD
    const { reservationId } = await params;
=======
    const params = await context.params;
    const { reservationId } = params;
>>>>>>> d3106684811cb076ae928d15fb6ae800cda9b232

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