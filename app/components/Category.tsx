'use client';

import { FC, useCallback } from "react";
import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from 'query-string';

interface ICategoryProps {
    text: string;
    icon: IconType;
    selected?: boolean;
}

const Category:FC<ICategoryProps> = ({ text, icon: Icon, selected }) => {

    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let query = {};

        if(params) {
            query = queryString.parse(params.toString());
        }
        const updatedQuery: any = {
            ...query, category: text
        }
        if(params?.get("category") === text) {
            delete updatedQuery.category
        }      
        
        const url = queryString.stringifyUrl({ url: "/", query: updatedQuery }, { skipNull: true });
        router.push(url);
    }, [text, router, params])

    return <div className={`
        flex flex-col items-center hover:text-neutral-800 text-neutral-500 transition cursor-pointer
        ${selected ? "text-blue-500" : "text-neutral-500"}
    `}
    onClick={handleClick}>
        <Icon size={24} />
        <div className="text-sm font-medium">
            {text}
        </div>
    </div>;
}
 
export default Category;