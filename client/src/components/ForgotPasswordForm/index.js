import React from 'react';
import './style.css';

const ForgotPasswordForm = (props) => {

    const {
        resetEmail,
        setResetEmail,
        handleSubmit,
        forgotPasswordInstructions
    } = props;

    return (
        <div className='forgot-password-root'>
            <div className='forgot-password-box'>
                <div className='forgot-password-header-div'>
                    <h1>Forgot</h1>
                    <h1 className='outline'>Password</h1>
                </div>
                <div className='forgot-password-instructions-div'>
                    <p>{forgotPasswordInstructions}</p>
                </div>
                <div>

                    <label htmlFor='forgot-password-email'>Email</label><br />
                    <input
                        type='text'
                        id='forgot-password-email'
                        name='forgot-password-email'
                        value={resetEmail}
                        onChange={event => setResetEmail(event.target.value)}
                        className='forgot-password-input'
                    /><br />

                </div>
                <div>
                    <button className='forgot-password-button' type='button' onClick={handleSubmit}>Send</button>
                </div>
                <p>Here by mistake? <a href='/login' className='create-link'>Login</a></p>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;