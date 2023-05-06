import {FC} from 'react'
import SignUp from "../components/SignUp/SignUp";

const RegisterPage: FC = () => {
    return (
        <div>
            <h1>Register</h1>
            <SignUp/>
            <center>
                Already have an account? <a href="/login">Sign in</a>
            </center>
        </div>
    )
}

export default RegisterPage

