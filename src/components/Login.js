import React, { useState } from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase'

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        if(email && password) {

            auth
                .signInWithEmailAndPassword(email, password)
                .then(auth => {
                    history.goBack();
                    // history.push('/');
                })
                .catch(error => alert(error.message));

        } else {
            alert('Input is not well formatted');
        }

    }

    const register = (e) => {
        e.preventDefault();
        if(email && password) {
            
            auth
                .createUserWithEmailAndPassword(email, password)
                .then((auth) => {
                    if(auth) {
                        history.push('/');
                    }
                })
                .catch(error => alert(error.message));
    
        } else {
            alert('Invalid Input!');
        }
    }

    return (
        <div className="login">
            <Link to="/">
                <img
                    className="login__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                />           
            </Link> 
            <div className="login__container">
                <h1 >Sign-In</h1>
                <form>
                    <h5>Email</h5>
                    <input                         
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="email"
                    />

                    <h5>Password</h5>
                    <input 
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password" 
                    />

                    <button 
                        onClick={signIn}
                        className="login__signInButton"
                    >Sign In</button>
                </form>
                <p>
                    By signing-in you agree to Amazon Clone's Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>            
                <button 
                    onClick={register}
                    className="login__registerButton"
                >Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
