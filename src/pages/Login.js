import React, { useState } from 'react'
import Header from '../components/header'
import { Container } from 'react-bootstrap'
import './styles/Login.css'

function LoginWindow() {
    const emailFormat = /^\w+@\w+\.\w{2,}$/;
    const [email, setEmail] = useState('');

    const handleValidation = (event) => {
        const value = event.target.value;
        const emailString = value.match(emailFormat);
        if (emailString) {
            setEmail(emailString);
        } else {
            setEmail('');
            console.log(email);
        }
    }

    return (
        <div className="form-container">
            <input type="text" onChange={handleValidation}/>
            <input type="password" />
            <input type="button" value="Login" />
        </div>
    )
}

function Login() {
    return (
        <Container>
            <Header />
            <LoginWindow />
        </Container>
    )
}

export default Login