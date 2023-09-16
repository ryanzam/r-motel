import { FC, useCallback } from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";

interface ICounterProps {
    title: string;
    subtitle?:string;
    value: number;
    onChange:(val: number) => void;
}

const Counter:FC<ICounterProps> = ({ title, subtitle, value, onChange }) => {

    const handleAdd = useCallback(() => {
        onChange(value + 1);
    }, [value, onChange]);

    const handleSubtract = useCallback(() => {
        if(value === 1) return;
        onChange(value - 1);
    }, [value, onChange]);

    return <div className="flex items-center justify-between">
        <div className="">
            <div className="text-neutral-700 font-semibold text-base">
                {title}
            </div>
            <div className="text-neutral-400 font-medium text-sm">
                {subtitle}
            </div>
        </div>
        <div className="flex items-center text-neutral-400">
            <div className=" hover:text-neutral-700" onClick={handleSubtract}>
                <AiOutlineMinusSquare size={34}/>
            </div>
            <div className="text-neutral-700 font-semibold text-lg mx-3">{value}</div>
            <div className=" hover:text-neutral-700" onClick={handleAdd}>
                <AiOutlinePlusSquare size={34}/>
            </div>
        </div>
    </div>
}
 
export default Counter;