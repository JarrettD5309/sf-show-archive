import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const { token, email } = useParams();
    const [loading, setLoading] = React.useState(true);
    const [showForm, setShowForm] = React.useState(false);
    const [resetPassword, setResetPassword] = React.useState('');
    const [resetPasswordConfirm, setResetPasswordConfirm] = React.useState('');
    const [resettoken, setResetToken] = React.useState('');
    const [resetEmail, setResetEmail] = React.useState('');

    useEffect(() => {
        const resetObj = {
            // email: email,
            token: token
        };
        console.log(resetObj);
        axios.get('/api/reset-password', {
            params: {
                email: email,
                token: token
            }
        })
            .then(res => {
                console.log(res);
                if (res.data === 'showForm') {
                    setShowForm(true);
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response.data === 'tokenExpired') {
                    console.log('expired');
                    setShowForm(false);
                }
            })
            .then(() => {
                setLoading(false);
            });

        // console.log(token);
        // console.log(email);
        // setResetEmail(email);
        // setResetToken(token);
    }, []);

    const handleSubmit = () => {
        const newPasswordObj = {
            email: email,
            token: token,
            password: resetPassword,
            passwordConfirm: resetPasswordConfirm
        };

        axios.post('/api/reset-password', newPasswordObj)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    return (
        loading ? null :
            <div className='create-root'>
                <div className='create-box'>
                    <h1>Password Reset</h1>
                    <div className='create-instructions-div'>
                        {/* <p>{createInstructions}</p> */}
                        {showForm ?
                            <p>Show Form</p>
                            :
                            <p>No Form</p>}
                    </div>
                    <div>
                        {showForm &&
                            <div>
                                <label htmlFor='create-password'>Password</label><br />
                                <input
                                    type='password'
                                    id='create-password'
                                    name='create-password'
                                    value={resetPassword}
                                    onChange={event => setResetPassword(event.target.value)}
                                    className='create-input'
                                /><br />
                                <label htmlFor='create-password-confirm'>Password Confirm</label><br />
                                <input
                                    type='password'
                                    id='create-password-confirm'
                                    name='create-password-confirm'
                                    value={resetPasswordConfirm}
                                    onChange={event => setResetPasswordConfirm(event.target.value)}
                                    className='create-input'
                                />
                            </div>
                        }

                    </div>
                    <div>
                        <button className='create-button' type='button' onClick={handleSubmit}>Send</button>
                    </div>
                    {/* <p>Already have an account? <a href='/login' className='create-link'>Login</a></p> */}
                </div>
            </div>
    );
};

export default ResetPassword;