import React, { useState } from 'react'
import Layout from '../components/layout'
import { Container, Form } from 'react-bootstrap'
import './styles/Login.css'
import { accounts } from '../data/accounts'
import { useDispatch } from 'react-redux'
import { login, logout } from '../features/user/userSlice'
import { Redirect } from 'react-router-dom'
import Button from '../components/button'

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
        <div className="login-window">
            <h4>Login to OnlineShop</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Control name="email" type="email" placeholder="E-mail" onChange={handleChange}/>
                <Form.Control name="password" type="password" placeholder="Password"  onChange={handleChange}/>
                <Button value="Login" type="submit" className="login-button"/>
            </Form>
        </div>
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
        <Layout>
            <div className="loginWindow-container">
                <LoginWindow onSubmit={handleLogin}/>
            </div>
            {success ? (admin ? <Redirect to="/admin" /> : <Redirect to="/" />) : ""}
        </Layout>
    )
}

export default Login