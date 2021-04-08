import React, { useState } from 'react'
import Header from '../components/header'
import { Container } from 'react-bootstrap'
import './styles/Login.css'
import { accounts } from '../data/accounts'
import { useDispatch } from 'react-redux'
import { login, logout } from '../features/user/userSlice'
import { Redirect } from 'react-router-dom'

function LoginWindow({ reset, onSubmit }) {
    const emailFormat = /^\w+@\w+\.\w{2,}$/;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailValidation = (event) => {
        const value = event.target.value;
        const emailString = value.match(emailFormat);
        if (emailString) {
            setEmail(emailString);
        } else {
            setEmail('');
            console.log(email);
        }
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleChange = (event) => {
        // if (reset) {
        //     event.target.value = ""
        //     reset = false
        // }

        if (event.target.name === "email") handleEmailValidation(event)
        else handlePasswordChange(event)
    }

    const handleSubmit = (event) => {
        if (email === "") {
            alert("E-mail is invalid!")
        } else if (password === "") {
            alert("Password can't be empty!")
        } else {
            onSubmit(email, password)
        }
        event.preventDefault();
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input name="email" type="text" onChange={handleChange}/>
            <input name="password" type="password" onChange={handleChange}/>
            <input type="submit" value="Login" />
        </form>
    )
}

function Login({ location }) {
    const [success, setSuccess] = useState(false);
    const [admin, setAdmin] = useState(false);
    const dispatch = useDispatch()
    
    const handleLogin = (email, password) => {
        let accountDetail = accounts.find(acc => acc.email === email[0]);
        if (accountDetail) {
            let passwordMatch = new RegExp(password);
            if (accountDetail.password.match(passwordMatch)) {
                dispatch(login(accountDetail));
                setSuccess(true);
                setAdmin(accountDetail.isAdmin);
                return;
            }
        }
        alert("Username / password is wrong!")
    }
    // access message = location.state.message
    return (
        <Container>
            <Header />
            <LoginWindow onSubmit={handleLogin}/>
            {success ? (admin ? <Redirect to="/admin" /> : <Redirect to="/" />) : ""}
        </Container>
    )
}

export default Login