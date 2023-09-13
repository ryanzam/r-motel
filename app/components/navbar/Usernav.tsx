'use client';

import React, { FC, useCallback, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import UsernavMenu from "./UsernavMenu";
import useRegistrationModal from "@/app/hooks/useRegistrationModal";
import useSigninModal from "@/app/hooks/useSigninModal";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

interface IUsernavProps {
    signedinUser?: User | null
}


const Usernav:FC<IUsernavProps> = ({ signedinUser }) => {

    const [isOpen, setIsOpen] = useState(false);

    const registrationModal = useRegistrationModal();
    const signinModal = useSigninModal();

    const toggleOpen = useCallback(() => {
        setIsOpen(val => !val)
    }, [isOpen]);

    return <div className="relative">
        <div className="flex items-center">
            <div onClick={toggleOpen} className="hidden text-2xl md:block rounded-full hover:text-gray-500 cursor-pointer">
                <BiUserCircle />
            </div>
            {isOpen && 
                <div className="absolute w-[20vw] rounded-lg shadow-md right-0 top-12 text-sm overflow-hidden">
                    <div className="cursor-pointer">
                       {signedinUser ? (
                            <>
                                <UsernavMenu text="My favorites" onClick={() => {}}/>
                                <UsernavMenu text="My properties" onClick={() => {}}/>
                                <UsernavMenu text="My reservations" onClick={() => {}}/>
                                <hr />
                                <UsernavMenu text="Sign out" onClick={() => signOut()}/>
                            </>
                       ) : (
                        <>
                            <UsernavMenu text="Sign in" onClick={signinModal.onOpen}/>
                            <UsernavMenu text="Sign up" onClick={registrationModal.onOpen}/>
                        </>
                       )}
                    </div>
                </div>
            }
        </div>
    </div>
}

export default Usernav;