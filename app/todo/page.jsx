'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import Link from 'next/link'
import { getUserEmail } from './action'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import CheckBox from "../components/check_box.jsx"
import Loading from "../components/loading.jsx"


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
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(!isLoading)
        getTodo(),
            fetchUserEmail()
        setLoading(!isLoading)
    }, [refresh])

    const fetchUserEmail = async () => {
        const email = await getUserEmail();
        setUserEmail(email);
    };

    const handleStatusChange = async (todo, index, status) => {
        let checked = false;
        if (status !== true || status !== false) {
            checked = false
        }
        setSelectedStatus(prevSelectedStatus => ({
            ...prevSelectedStatus,
            [index]: status,
            status: !checked,
        }));

        console.log('Status to be updated:', status); // Log the status directly

        await putTodo(todo.id, status)
        setRefresh(!refresh)
        console.log('Prod', todo.status)
    };

    async function handleDelete(id) {
        await deleteTodos(id)
        let filterTodos = todos.filter(x => x.id != id)
        setTodo(filterTodos)
    }

    async function deleteTodos(id) {
        try {
            setLoading(!isLoading)
            const response = await axios.delete(`https://664c5a5535bbda10988000cc.mockapi.io/todos/${id}`);
            setLoading(!isLoading)
        } catch (error) {
            console.log('error', error)
        }
    }

    async function handleTextChange(e) {
        setTextVale(e.target.value)
    }

    async function putTodo(id, status) {
        try {
            setLoading(!isLoading)
            let body = {
                status: status
            }
            console.log(body)
            await axios.put(`https://664c5a5535bbda10988000cc.mockapi.io/todos/${id}`, body)
            setLoading(!isLoading)
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
            {isLoading ? (<div className="flex justify-center fixed inset-0"><Loading></Loading></div>)
                : (
                    <div className="container">
                        <div className="max-w-2xl mx-auto my-2">
                            <div>
                                User Email : {userEmail}
                            </div>
                            <div className="flex items-center">
                                <input onChange={handleTextChange} className="input input-bordered w-full my-2" name="name" type="text" placeholder="Type Here" value={textVal} />
                                <button onClick={handleAddVal} className="btn btn-primary ml-1">Add</button>
                            </div>
                            <ul>
                                {
                                    todos.map((todo, index) => (
                                        <li key={index} className="flex items-center justify-between my-2">
                                            <div className="flex">
                                                <CheckBox selectedStatus={todo.status} onClick={(status) => handleStatusChange(todo, index, status)}></CheckBox>
                                                <div className={`ml-1 ${todo.status === true ? 'line-through' : ''}`}>
                                                    {todo.name}
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <Link href={`todo/${todo.id}`}>
                                                    <button className="ml-2 h-8 w-8 flex items-center justify-center border border-gray-400 rounded">
                                                        <FontAwesomeIcon icon={faPen} />
                                                    </button>
                                                </Link>
                                                <button className="ml-2 h-8 w-8 flex items-center justify-center border border-gray-400 rounded" onClick={() => handleDelete(todo.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <style jsx>{`
                    svg{
                        fill: white
                    }
                `}
                        </style>
                    </div>
                )}
        </>
    )
}

export default Page;