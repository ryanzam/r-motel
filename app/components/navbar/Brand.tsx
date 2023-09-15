'use client'

import { useRouter } from "next/navigation";

const Brand =() => {

    const router = useRouter();

    return <div className="cursor-pointer">
        <h3 onClick={() => router.push("/")} className="font-medium"><span className="to-blue-600 font-extrabold">R</span>-Motel</h3>
    </div>
}

export default Brand;