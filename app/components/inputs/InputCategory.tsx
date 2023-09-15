import { FC } from "react";
import { IconType } from "react-icons";

interface IInputCategoryProps {
    text: string;
    icon: IconType;
    onClick: (category: string) => void;
    selected?: boolean;
}

const InputCategory: FC<IInputCategoryProps> = ({text, icon: Icon, onClick, selected}) => {
    return <div onClick={() => onClick(text)}
                className={`flex items-center justify-between rounded-md border-2 p-4 hover:border-black transition cursor-pointer
                    ${selected ? "border-black" : "border-neutral-400"}
                `}>
                <div>
                    {text}
                </div>
                <Icon size={24}/>
    </div>;
}
 
export default InputCategory;