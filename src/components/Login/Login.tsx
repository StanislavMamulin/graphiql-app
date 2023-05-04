import {FC, SyntheticEvent} from 'react'
import Form from "../form/Form";

const Login: FC = () => {
    const handleRegister = (e: SyntheticEvent) => {
        e.preventDefault();
    }
    return <Form title="Login" handleSubmit={handleRegister}/>
}

export default Login

