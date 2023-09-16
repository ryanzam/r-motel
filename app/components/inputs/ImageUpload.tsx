import { CldUploadWidget } from 'next-cloudinary';
import { FC, useCallback } from 'react';
import { BiImageAdd } from 'react-icons/bi';

import Image from "next/image";

declare global {
    var cloudinary: any;
}

interface IImageUploadProps {
    value: string;
    onChange:(value:string) => void;
}

const ImageUpload:FC<IImageUploadProps> = ({ value, onChange }) => {
    
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange])

    return <CldUploadWidget onUpload={handleUpload}
                uploadPreset='niueoylx'
                options={{ maxFiles: 1}}
            >
            {({ open }) => {
                return <div onClick={() => open?.()}
                    className='relative flex items-center justify-center cursor-pointer p-20 hover:opacity-60 border-neutral-300 border-2'>
                        <BiImageAdd size={60}/>
                        <div className='font-semibold'>Click to upload images</div>
                        
                        { value && <div>
                                <Image src={value} alt='image upload' fill style={{ objectFit: "cover"}}/>
                            </div>}
                </div>  
            }}
        </CldUploadWidget>
}
 
export default ImageUpload;