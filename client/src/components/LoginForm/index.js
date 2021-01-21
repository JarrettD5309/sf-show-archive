import React from 'react';
import './style.css';

const LoginForm = (props) => {
    const {
        loginUsername,
        setLoginUsername,
        loginPassword,
        setLoginPassword
    } = props;

    return (
        <div className='login-root'>
            <div className='login-box'>
                <h1>Login</h1>
                <div>
                    <label htmlFor='login-username'>Username</label><br />
                    <input 
                        type='text' 
                        id='login-username' 
                        name='login-username'
                        value={loginUsername}
                        onChange={event => setLoginUsername(event.target.value)} 
                        className='login-input' 
                    /><br />
                    <label htmlFor='login-password'>Password</label><br />
                    <input 
                        type='password' 
                        id='login-password' 
                        name='login-password'
                        value={loginPassword}
                        onChange={event => setLoginPassword(event.target.value)} 
                        className='login-input' 
                    />
                </div>
                <div>
                    <button className='login-button' type='button'>Login</button>
                </div>
                <p>Forgot your password?</p>
                <p>First time here? Create an account</p>
            </div>
        </div>
    );

};

export default LoginForm;