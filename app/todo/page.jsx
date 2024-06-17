'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import StatusDropDown from "../components/status_dropdown"
import Link from 'next/link'
import { getUserEmail } from './action'


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
    const [textVal, setTextVale] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        getTodo(),
        fetchUserEmail()
    }, [refresh])

    const fetchUserEmail = async () => {
        const email = await getUserEmail();
        setUserEmail(email);
    };

    const handleStatusChange = async (todo, index, status) => {
        console.log(status)
        setSelectedStatus(prevSelectedStatus => ({
            ...prevSelectedStatus,
            [index]: status,
            status: status
        }));
    
        console.log('Status to be updated:', status); // Log the status directly
    
        await putTodo(todo.id,status)
        setRefresh(!refresh)
        console.log('Prod', todo.status)
        console.log(index, status)
    };

    async function handleDelete(id) {
        await deleteTodos(id)
        let filterTodos = todos.filter(x => x.id != id)
        setTodo(filterTodos)
    }

    async function deleteTodos(id) {
        try {
            const response = await axios.delete(`https://664c5a5535bbda10988000cc.mockapi.io/todos/${id}`);
        } catch (error) {
            console.log('error', error)
        }
    }

    async function handleTextChange(e) {
        setTextVale(e.target.value)
    }

    async function putTodo(id, status) {
        try {
            let body = {
                status: status
            }
            console.log(body)
            await axios.put(`https://664c5a5535bbda10988000cc.mockapi.io/todos/${id}`, body)
        } catch (error) {
            console.log('error', error)
        }
    }

    async function handleAddVal() {
        try {
            let body = {
                name: textVal,
                status: 'Started'
            }
            const response = await axios.post('https://664c5a5535bbda10988000cc.mockapi.io/todos', body);
            setTextVale('');
            setTodo((prevTodos) => [...prevTodos, response.data]);
        } catch (error) {
            console.log('error add value erorr', error)
        }
    }
    return (
        <>
            <div>
                User Email : {userEmail}
            </div>
            <div>
                <input onChange={handleTextChange} className="mt-2"name="name" type="text" value={textVal} />
                <button onClick={handleAddVal} className="border-2 border-dashed border-black bg-green-300 ml-2 mb-3">Add</button>
            </div>
            <ul>
                {
                    todos.map((todo, index) => (
                        <li key={index}>
                            {todo.name} <StatusDropDown dropDownStatus={todo.status} onStatusChange={(status) => handleStatusChange(todo, index, status)}></StatusDropDown>
                            <Link href={`todo/${todo.id}`}>
                                <button>Edit</button>
                            </Link>
                            <button onClick={() => handleDelete(todo.id)}>Delete</button>
                        </li>
                    ))

                }
            </ul>
        </>
    )
}

export default Page;