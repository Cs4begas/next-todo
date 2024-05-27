'use client'
import { useState } from "react";

export default function StatusDropDown({ onStatusChange }) {
    const dropDownlist = ['Started', 'Pending', 'Done']
    const [selectedStatus, setSelectedStatus] = useState();

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedStatus(newValue);
        onStatusChange(newValue);
    };

    return (
        <select name="statusList" id="statusList" value={selectedStatus} onChange={handleChange}>
            {
                dropDownlist.map((data, index) => (
                    <option key={index} value={data}>{data}</option>
                ))
            }
        </select>
    )
}