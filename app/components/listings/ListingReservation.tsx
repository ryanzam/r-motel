"use client";

import { FC } from "react";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../buttons/Button";

interface IListingReservationProps {
    price: number;
    totalPrice: number;
    dateRange: Range;
    onChangeDate:(value: Range) => void;
    disabled: boolean;
    onSubmit:() => void;
    disabledDates: Date[]
}

const ListingReservation:FC<IListingReservationProps> = ({ price, totalPrice, dateRange, onChangeDate, disabled, onSubmit, disabledDates }) => {
    return ( <div className="border-neutral-200 border-[1px] overflow-hidden">
        <div className="flex gap-1 items-center p-2">
            <div className="text-lg font-semibold">€ {price}</div>

            <div className="text-neutral-500 font-light">/night</div>
        </div>
        <hr />
        
        <Calendar value={dateRange}
            disabledDates={disabledDates}
            onChange={(value) => onChangeDate(value.selection)}/>
        <hr />

        <div className="p-4">
            <Button text="Make Reservation" disabled={disabled} onClick={onSubmit}/>
        </div>

        <div className="flex items-center justify-between p-4">
            <div className="text-lg font-semibold">Total</div>
            <div>€ {totalPrice}</div>
        </div>
    </div> );
}
 
export default ListingReservation;