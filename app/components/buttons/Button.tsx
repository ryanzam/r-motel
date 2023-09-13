import { FC, MouseEvent } from "react"
import { IconType } from "react-icons";

interface IButtonProps {
    text: string;
    disabled?: boolean;
    primary?: boolean;
    icon?: IconType;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<IButtonProps> = ({text, disabled, primary, onClick, icon: Icon}) => {
    return <button onClick={onClick}
                disabled={disabled}
                className={`relative p-2 w-full border-2 rounded-lg hover:opacity-60 disabled:opacity-60 disabled:cursor-not-allowed
                ${primary ? 'bg-blue-600' : 'bg-white'}
                ${primary ? 'text-white' : 'text-black'}
                ${primary ? 'border-blue-950' : 'border-neutral-950'}
            `}>
        {Icon && <Icon className="absolute left-4 top-3" size={22}/>}
        {text}
    </button>
}

export default Button;