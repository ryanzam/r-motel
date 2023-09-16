'use client';

import useLocation from "@/app/hooks/useLocation";
import { FC } from "react";
import Select from "react-select";

interface ISelectLocationProps {
    value?: SelectLocationValue;
    onChange:(val: SelectLocationValue) => void;
}

export type SelectLocationValue = {
    label: string;
    latlng: number [];
    region: string;
    flag: string;
    value: string;
}

const SelectLocation: FC<ISelectLocationProps> = ({ value, onChange }) => {

    const { getAllCountries } = useLocation();

    return <div>
        <Select placeholder="Anywhere"
            menuPortalTarget={document.body} 
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            options={getAllCountries()}
            isClearable 
            value={value}
            onChange={(val) => onChange(val as SelectLocationValue)}
            formatOptionLabel={(opt: any) => (
                <div className="flex items-center">
                    <div>{opt.flag}</div>
                    <div className="ml-1">
                        {opt.label}, <span className="text-neutral-500">{opt.region}</span>
                    </div>
                </div>
            )}
            classNames={{
                input: () => "text-md",
                control: () => "border-2 p-3",
                dropdownIndicator: () => "z-50"
            }}/>

    </div>
}
 
export default SelectLocation;