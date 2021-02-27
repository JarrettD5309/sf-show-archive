import React from 'react';
import './style.css';

const CreateAccountForm = (props) => {
    const {
        createUsername,
        setCreateUsername,
        createPassword,
        setCreatePassword,
        createEmail,
        setCreateEmail,
        createPasswordConfirm,
        setCreatePasswordConfirm,
        createInstructions,
        handleSubmit
    } = props;

    return (
        <div className='create-root'>
            <div className='create-box'>
                <h1>Sign Up</h1>
                <div className='create-instructions-div'>
                    <p>{createInstructions}</p>
                </div>
                <div>
                    <label htmlFor='create-username'>Username</label><br />
                    <input
                        type='text'
                        id='create-username'
                        name='create-username'
                        value={createUsername}
                        onChange={event => setCreateUsername(event.target.value)}
                        className='create-input'
                    /><br />
                    <label htmlFor='create-email'>Email</label><br />
                    <input
                        type='text'
                        id='create-email'
                        name='create-email'
                        value={createEmail}
                        onChange={event => setCreateEmail(event.target.value)}
                        className='create-input'
                    /><br />
                    <label htmlFor='create-password'>Password</label><br />
                    <input
                        type='password'
                        id='create-password'
                        name='create-password'
                        value={createPassword}
                        onChange={event => setCreatePassword(event.target.value)}
                        className='create-input'
                    /><br />
                    <label htmlFor='create-password-confirm'>Password Confirm</label><br />
                    <input
                        type='password'
                        id='create-password-confirm'
                        name='create-password-confirm'
                        value={createPasswordConfirm}
                        onChange={event => setCreatePasswordConfirm(event.target.value)}
                        className='create-input'
                    />
                </div>
                <div>
                    <button className='create-button' type='button' onClick={handleSubmit}>Sign Up</button>
                </div>
                <p>Already have an account? <a href='/login' className='create-link'>Login</a></p>
            </div>
        </div>
    );

};

export default CreateAccountForm;