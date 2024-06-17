'use client'
import { useEffect ,useState } from "react";

export default function StatusDropDown({ dropDownStatus , onStatusChange }) {
    const dropDownlist = ['Started', 'Pending', 'Done']
    const [selectedStatus, setSelectedStatus] = useState();

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedStatus(newValue);
        onStatusChange(newValue);
    };

    useEffect(() => {
        handleStatus();
    },[])

    async function handleStatus(){
        let defaultStatus = dropDownlist.filter(data => data == dropDownStatus);
        if(defaultStatus){
            setSelectedStatus(defaultStatus)
        }
    }

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