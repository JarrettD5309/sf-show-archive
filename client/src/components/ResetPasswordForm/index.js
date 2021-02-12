import React from 'react';
import './style.css';

const ResetPasswordForm = (props) => {
    const {
        showForm,
        resetPassword,
        setResetPassword,
        resetPasswordConfirm,
        setResetPasswordConfirm,
        resetPasswordInstructions,
        handleSubmit
    } = props;
    return (
        <div className='reset-password-root'>
            <div className='reset-password-box'>
                <div className='reset-password-header-div'>
                    <h1>Password</h1>
                    <h1 className='outline'>Reset</h1>
                </div>
                <div className='reset-password-instructions-div'>
                    <p>{resetPasswordInstructions}</p>
                </div>
                {showForm &&
                    <div>
                        <div>
                            <label htmlFor='reset-password-password'>Password</label><br />
                            <input
                                type='password'
                                id='reset-password-password'
                                name='reset-password-password'
                                value={resetPassword}
                                onChange={event => setResetPassword(event.target.value)}
                                className='reset-password-input'
                            /><br />
                            <label htmlFor='reset-password-password-confirm'>Password Confirm</label><br />
                            <input
                                type='password'
                                id='reset-password-password-confirm'
                                name='reset-password-password-confirm'
                                value={resetPasswordConfirm}
                                onChange={event => setResetPasswordConfirm(event.target.value)}
                                className='reset-password-input'
                            />
                        </div>
                    </div>
                }

                <div>
                    {showForm &&
                        <button className='reset-password-button' type='button' onClick={handleSubmit}>Send</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordForm;