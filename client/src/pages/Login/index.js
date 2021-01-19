import React from 'react';
import './style.css';

const Login = () => {

    return (
        <div className='login-root'>
            <div className='login-box'>
                <h1>Login</h1>
                <div>
                    <label htmlFor='login-username'>Username</label><br />
                    <input type='text' id='login-username' name='login-username' className='login-input' /><br />
                    <label htmlFor='login-password'>Password</label><br />
                    <input type='password' id='login-password' name='login-password' className='login-input' />
                </div>
                <div>
                    <button className='login-button' type='button'>Login</button>
                </div>
            </div>
        </div>
    );

};

export default Login;