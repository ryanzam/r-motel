'use client';

import { FC } from "react";

interface IUsernavMenu {
    text: string;
    onClick: () => void;
}

const UsernavMenu: FC<IUsernavMenu> = ({ text, onClick }) => {
    return <div onClick={onClick} className="font-semibold hover:bg-neutral-200 transition px-5 py-4">
        {text}
    </div>
}

export default UsernavMenu;