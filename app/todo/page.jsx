'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import StatusDropDown  from "../components/status_dropdown"

function Page() {

    async function getTodo() {
        try {
            const response = await axios.get('https://664c5a5535bbda10988000cc.mockapi.io/todos')
            setTodo(response.data)
        } catch (error) {
            console.log('GetTodo is error', error)
        }
    }

    const [todos, setTodo] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});
    useEffect(() => {
        getTodo()
    }, [])

    const handleStatusChange = (index, status) => {
        setSelectedStatus(prevState => ({
            ...prevState,
            [index]: status
        }));
        console.log(index, status)
    };

    return (
        <>

            <input name="name" type="text" />
            <button className="border-2 border-dashed border-black bg-green-300 ml-2 mb-3">Add</button>
            <ul>
                {
                    todos.map((todo, index) => (
                        <li key={index}>
                            {todo.name} <StatusDropDown onStatusChange={(status) => handleStatusChange(index, status)}></StatusDropDown>
                        </li>
                    ))

                }
            </ul>
        </>
    )
}

export default Page;