'use client';

import React, { FC, useCallback, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import UsernavMenu from "./UsernavMenu";
import useRegistrationModal from "@/app/hooks/useRegistrationModal";
import useSigninModal from "@/app/hooks/useSigninModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import Image from "next/image";
import Button from "../buttons/Button";
import useRentModal from "@/app/hooks/useRentModal";

interface IUsernavProps {
    signedinUser?: SafeUser | null
}


const Usernav:FC<IUsernavProps> = ({ signedinUser }) => {

    const [isOpen, setIsOpen] = useState(false);

    const registrationModal = useRegistrationModal();
    const signinModal = useSigninModal();
    const rentModal = useRentModal();

    const toggleOpen = useCallback(() => {
        setIsOpen(val => !val)
    }, [isOpen]);

    const handleRentClick = useCallback(() => {
        if(!signedinUser) return signinModal.onOpen();

        rentModal.onOpen()
    }, [signedinUser, signinModal]);

    return <div className="relative">
        <div className="flex items-center">
            <div className="mr-3 hover:text-neutral-400 text-sm cursor-pointer" onClick={handleRentClick}>Add</div>                
            <div className="flex text-2xl md:block rounded-full hover:text-gray-500 cursor-pointer z-50">
                <div onClick={toggleOpen} >
                {signedinUser ? (
                    <Image className="rounded-full border-gray-600 border-2" 
                        src={signedinUser?.image || ""}
                        width={30}
                        height={30} 
                        alt="avatarimg"/>
                ) : <BiUserCircle />}
                </div>
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