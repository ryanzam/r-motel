import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
    userId?: string;
    ownerId?: string;
}

export default async function getReservations(params: IParams) {
    try {
        const { listingId, userId, ownerId } = params;

        const query: any = {};

        if(listingId) {
            query.listingId = listingId
        }

        if(userId) {
            query.userId = userId
        }

        if(ownerId) {
            query.listing = { 
                userId: ownerId
            };
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: { createdAt: "desc" }
        })

        const safeReservations = reservations.map((rsv) => ({
            ...rsv,
            createdAt: rsv.createdAt.toISOString(),
            startDate: rsv.startDate.toISOString(),
            endDate: rsv.endDate.toISOString(),
            listing: {
                ...rsv.listing,
                createdAt: rsv.listing.createdAt.toISOString()
            }
        }));

        return safeReservations
    } catch (error: any) {
        throw new Error(error.message)
    }
}