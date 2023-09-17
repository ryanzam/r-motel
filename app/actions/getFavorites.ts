import prisma from "@/app/libs/prismadb";
import getSigninUser from "./getSignedinUser";

export default async function getReservations() {
    try {
        const signedinUser = await getSigninUser();

        if(!signedinUser) return [];

        const favorites = await prisma.listing.findMany({
            where: { id: {
                in: [...(signedinUser.favoriteIds || [])]
            }}
        });

        const safeFavorites = favorites.map((fav) => ({
            ...fav,
            createdAt: fav.createdAt.toISOString()
        }));
        return safeFavorites;
    } catch (error: any) {
        throw new Error(error.message);
    }
}