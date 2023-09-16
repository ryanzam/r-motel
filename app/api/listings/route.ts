import {NextResponse} from "next/server";
import prisma from "../../../app/libs/prismadb";

import getSigninUser from "@/app/actions/getSignedinUser";

export async function POST(request: Request) {
    const user = await getSigninUser();
    if(!user) return NextResponse.error();

    const body = await request.json();
    const { category, location, guestCount, roomCount, bathroomCount, imageSrc, price, title, description } = body;

    const listing = await prisma.listing.create({
        data: { category, locationValue: location.label, guestCount, roomCount, bathroomCount, 
            imageSrc, price: parseInt(price, 10), title, description, userId: user.id}
    });

    return NextResponse.json(listing);
}