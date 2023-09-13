'use client'

import { BiSearchAlt } from "react-icons/bi";

const Search =() => {

    return <div className="w-full py-2 md:w-auto border-[1px] rounded-full shadow-sm hover:shadow-md cursor-pointer transition">
    <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-6">Anyplace</div>
        <div className="hidden sm:block border-x-[1px] text-sm font-semibold px-6">Anyday</div>
        <div className="text-sm pr-2 pl-6 text-gray-600 flex items-center gap-2">
            <div className="hidden sm:block">Adults</div>
            <div className="bg-blue-600 p-2 rounded-full text-white">
                <BiSearchAlt />
            </div>
        </div>
    </div>
</div>
}

export default Search;