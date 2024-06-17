'use client'

import { useFormState } from 'react-dom';
import { login } from './action'

function Page(){
    const initState = {
        message : ''
    }

    const [state, formAction]= useFormState(login, initState)
    return (
        <form action={formAction}>
            <div>
                Email: <input type="text" name="email"/>
            </div>
            <div>
                Password: <input type="password" name="password"/>
            </div>
            <div>
                Message : {state.message}
            </div>
            <button>Login</button>
        </form>
    )
}

export default Page;