'use client';

import { FC, ReactElement, useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../buttons/Button";

interface IModalProps {
    title?: string;
    body?: ReactElement;
    footer?: ReactElement;
    isOpen: boolean;
    disabled?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    actionText: string;
    secondaryActionText?: string;
    primaryBtn?: boolean;
    secondaryAction?: () => void;
}

const Modal: FC<IModalProps> = ({
    title, body, footer, isOpen, onClose, onSubmit, disabled, actionText, primaryBtn, secondaryActionText, secondaryAction
}) => {

    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if(disabled) return;
        
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose, disabled]);

    const handleSubmit = useCallback(() => {
        if(disabled) return;

        if(onSubmit) 
            onSubmit();
    }, [onSubmit])

    if(!isOpen) return null;

    return  <div className="flex justify-center items-center fixed z-50 overflow-x-hidden overflow-y-auto inset-0 bg-neutral-700/60">
        <div className="relative w-full md:w-4/6 lg:w-3/6 my-6 mx-auto h-full md:h-auto lg:h-auto">
            <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'}
                ${showModal ? 'opacity-100' : 'opacity-0'}
            `}>
                <div className="translate h-full md:h-auto lg:h-auto rounded-lg flex flex-col w-full bg-white">
                    <div className="flex items-center rounded-t p-6 border-b-[1px] justify-between">
                        <div className="text-lg font-semibold">
                            {title}
                        </div>
                        <button onClick={handleClose}>
                            <AiOutlineClose size={20}/>
                        </button>
                    </div>

                    <div className="relative flex-auto p-6">
                        {body}
                    </div>
                    <div className="flex flex-col p-6 gap-4">
                        <div className="flex flex-row items-center w-full gap-5">
                            <Button primary={primaryBtn} disabled={disabled} text={actionText} onClick={handleSubmit} />
                            {secondaryAction && secondaryActionText && <Button disabled={disabled} text={actionText} onClick={secondaryAction} />}
                        </div>
                        {footer}
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Modal;