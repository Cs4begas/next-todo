'use client'
import { useState } from 'react';

export default function CheckBox({ selectedStatus, onClick }) {
    const [isChecked, setIsChecked] = useState(selectedStatus);

    const handleChange = async (event) => {
        const newStatus = event.target.checked;
        setIsChecked(newStatus);
        if (onClick) {
            onClick(newStatus);
        }
    };

    return (
        <input type="checkbox" checked={isChecked} onChange={handleChange} className="checkbox checkbox-success" />
    )
}