import getSigninUser from "@/app/actions/getSignedinUser";
import { NextResponse } from "next/server";

<<<<<<< HEAD
export async function POST(request: Request, { params }: { params: Promise<{ listingId: string }> }) {
=======
interface IParams {
    params: Promise<{ listingId: string }>;
}

export async function POST(request: Request, context: IParams) {
>>>>>>> d3106684811cb076ae928d15fb6ae800cda9b232
    const signedInUser = await getSigninUser();

    if (!signedInUser) return NextResponse.error();

<<<<<<< HEAD
    const { listingId } = await params;
=======
    const params = await context.params;
    const { listingId } = params;
>>>>>>> d3106684811cb076ae928d15fb6ae800cda9b232

    if (!listingId || typeof listingId !== "string") throw new Error("Invalid listingId");

    let favoriteIds = [...(signedInUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user = await prisma?.user.update({
        where: { id: signedInUser.id },
        data: { favoriteIds }
    });
    return NextResponse.json(user);
}

<<<<<<< HEAD
export async function DELETE(request: Request, { params }: { params: Promise<{ listingId: string }> }) {
=======
export async function DELETE(request: Request, context: IParams) {
>>>>>>> d3106684811cb076ae928d15fb6ae800cda9b232
    const signedInUser = await getSigninUser();

    if (!signedInUser) return NextResponse.error();

<<<<<<< HEAD
    const { listingId } = await params;
=======
    const params = await context.params;
    const { listingId } = params;

>>>>>>> d3106684811cb076ae928d15fb6ae800cda9b232
    if (!listingId || typeof listingId !== "string") throw new Error("Invalid listingId");

    let favoriteIds = [...(signedInUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter(id => id !== listingId);

    const user = await prisma?.user.update({
        where: { id: signedInUser.id },
        data: { favoriteIds }
    });
    return NextResponse.json(user);
}