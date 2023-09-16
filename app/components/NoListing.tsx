'use client';

import { useRouter } from "next/navigation";
import { FC } from "react";
import Button from "./buttons/Button";

interface INoListingProps {
    title?: string;
    subTitle?: string;
    showRest?: boolean;
}

const NoListing:FC<INoListingProps> = ({ 
    title = "No matches found.", 
    subTitle = "Try changing different filters.", 
    showRest
}) => {
    const router = useRouter();

    return <div className="flex flex-col gap-3 items-center justify-center h-[70vh]">
        <div className="font-bold text-lg">{title}</div>
        <div className="text-sm text-neutral-500">{subTitle}</div>
        <div className="mt-2">
            {showRest && <Button text="Remove filters" onClick={() => router.push("/")}/>}
        </div>
    </div>
}
 
export default NoListing;