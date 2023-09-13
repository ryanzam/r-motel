import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getSigninUser() {
    try {
        const session = await getSession();

        if(!session?.user?.email) return null;

        const signedinUser = await prisma.user.findUnique({ 
            where: { email: session.user.email as string }
        });

        if(!signedinUser) return null;

        return signedinUser;
    }  catch(err: any) {
        return null;
    }
}