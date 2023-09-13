import { User } from "@prisma/client";
import Container from "../Container";
import Brand from "./Brand";
import Search from "./Search";
import Usernav from "./Usernav";
import { FC } from "react";

interface INavbarProps {
    signedinUser?: User | null
}

const Navbar:FC<INavbarProps> = ({ signedinUser }) => {
   return(
    <div className="w-full fixed bg-white shadow-sm z-10">
        <div className="py-3 border-b-[1px]">
            <Container>
                <div className="flex justify-between items-center">
                    <Brand />
                    <Search />
                    <Usernav signedinUser={signedinUser}/>
                </div>
            </Container>
        </div>
    </div>
   )
}

export default Navbar;