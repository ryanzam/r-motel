'use client';

import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import {FaEuroSign} from "react-icons/fa";

interface IInputProps {
    id: string;
    label: string;
    disabled?: boolean;
    required?: boolean;
    type?: string;
    priceFormat?: boolean;
    placeholder?: string;
    errors: FieldErrors;
    register: UseFormRegister<FieldValues>;
}

const Input:FC<IInputProps> = ({id, label, disabled, required, type, priceFormat, placeholder, errors, register}) => {
    return <div className="relative w-full">
        {priceFormat && <FaEuroSign className="text-neutral-600 absolute left-3 top-12" size={16}/>}
        <input id={id} 
                className={`peer w-full p-4 mt-6 border-2 rounded-md disabled:opacity-60 disabled:cursor-not-allowed
                            ${priceFormat ? "pl-8" : "pl-3"}
                            ${errors[id] ? "border-red-500" : "border-neutral-500"}
                            ${errors[id] ? "focus:border-red-500" : "focus:border-neutral-950"}    
                `}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                {...register(id, {required})} />
        <label className={`absolute text-md transform duration-200 -translate-y-4 top-10 z-10 origin-[0]
                            ${priceFormat ? "left-7" : "left-4"}
                            peer-focus:scale-75
                            peer-focus:traslate-y-4
                            peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0
                            ${errors[id] ? "text-red-500" : "text-neutral-900"}
        `}>
            {label}
        </label>
    </div>
}

export default Input;