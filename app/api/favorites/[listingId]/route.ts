import getSigninUser from "@/app/actions/getSignedinUser";
import { NextResponse } from "next/server";

interface IParams {
    listingId?: string;
}

export async function POST(request: Request, {params}: {params: IParams}) {
    const signedInUser = await getSigninUser();

    if(!signedInUser) return NextResponse.error();

    const { listingId } = params;
    if(!listingId || typeof listingId !== "string") throw new Error("Invalid listingId");

    let favoriteIds = [...(signedInUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user = await prisma?.user.update({
        where: { id: signedInUser.id },
        data: { favoriteIds }
    });
    return NextResponse.json(user);
}

export async function DELETE(request: Request, {params}: {params: IParams}) {
    const signedInUser = await getSigninUser();
    
    if(!signedInUser) return NextResponse.error();

    const {listingId} = params;
    if(!listingId || typeof listingId !== "string") throw new Error("Invalid listingId");

    let favoriteIds = [...(signedInUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter(id => id !== listingId);
    
    const user = await prisma?.user.update({
        where: { id: signedInUser.id },
        data: { favoriteIds }
    });
    return NextResponse.json(user);
}