"use client";

import { FC } from "react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"
interface ICalendarProps {
    value: Range;
    onChange:(value: RangeKeyDict) => void;
    disabledDates?: Date[]
}

const Calendar:FC<ICalendarProps> = ({ value, onChange, disabledDates }) => {
    return (<DateRange rangeColors={["#2563eb"]}
                ranges={[value]}
                date={new Date()}
                onChange={onChange}
                direction="vertical"
                disabledDates={disabledDates}
                showDateDisplay={false}
                minDate={new Date()}/>);
}
 
export default Calendar