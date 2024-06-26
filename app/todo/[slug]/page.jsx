'use client'

import axios from "axios";
import { Suspense, useEffect, useState } from "react"
import Loading from "../../components/loading";


export default function Page({ params }) {
    const [todo, setTodo] = useState({
        id: '',
        name: '',
        status: false,
        showStatus: ''
    });

    useEffect(() => {
        initBlog(params.slug)
    }, [])

    async function getTodoById(id) {
        const response = await axios(`https://664c5a5535bbda10988000cc.mockapi.io/todos/${id}`);
        return response.data;
    }


    async function initBlog(id) {
        const response = await getTodoById(id);
        if (response.status) {
            response.showStatus = response.status
        }
        setTodo(response)
    }

    async function handleNameChange(e) {
        const { name, value } = e.target
        setTodo((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    async function handleSubmit() {
        putTodo()
    }

    async function putTodo() {
        try {
            let body = {
                name: todo.name
            }
            const response = await axios.put(`https://664c5a5535bbda10988000cc.mockapi.io/todos/${params.slug}`, body)
            setTodo(response.data)
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <>
            <Suspense fallback={<Loading/>}>
                <div>
                    ID : {todo.id}
                </div>
                <div>
                    NAME:
                    <form action={handleSubmit}>
                        <input type="text" name="name" value={todo.name} onChange={handleNameChange} />
                        <button className="border-2 border-dashed border-black bg-green-300 ml-2 mb-3">Edit</button>
                    </form>
                </div>
                <div>
                    STATUS: {todo.showStatus}
                </div>
            </Suspense>
        </>
    )
}