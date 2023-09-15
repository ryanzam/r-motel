'use client';

import Container from "../Container";

import { MdApartment, MdOutlineWarehouse } from "react-icons/md"
import { BsFillHousesFill } from "react-icons/bs"
import { IoRestaurantOutline } from "react-icons/io5"

import Category from "../Category";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        text: "Apartment",
        description: "nice apartment",
        icon: MdApartment,
    },
    {
        text: "House",
        description: "nice, comfy house",
        icon: BsFillHousesFill,
    },
    {
        text: "PartyHall",
        description: "nice apartment",
        icon: MdOutlineWarehouse,
    },
    {
        text: "Restaurant",
        description: "nice food",
        icon: IoRestaurantOutline,
    }
]

const Categories = () => {

    const params = useSearchParams();
    const category = params?.get("category");
    const pathName = usePathname();

    const isIndexPage = pathName === "/";

    if(!isIndexPage) return null;

    return <Container>
        <div className="flex justify-between pt-3 pb-3">
            {categories.map(c => (
                <Category key={c.text} 
                    text={c.text}
                    icon ={c.icon}
                    selected={category === c.text}
                />
            ))}
        </div>
    </Container>
}

export default Categories;