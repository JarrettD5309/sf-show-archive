import React from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [resetEmail, setResetEmail] = React.useState('');

    const handleSubmit = () => {
        const resetObj = {
            email: resetEmail
        };

        axios.post('/api/forgot-password', resetObj)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>console.log(err));
    };

    return (
        <div className='create-root'>
            <div className='create-box'>
                <h1>Forgot Password</h1>
                <div className='create-instructions-div'>
                    {/* <p>{createInstructions}</p> */}
                </div>
                <div>
                    
                    <label htmlFor='create-email'>Email</label><br />
                    <input 
                        type='text' 
                        id='create-email' 
                        name='create-email'
                        value={resetEmail}
                        onChange={event => setResetEmail(event.target.value)} 
                        className='create-input' 
                    /><br />
                    
                </div>
                <div>
                    <button className='create-button' type='button' onClick={handleSubmit}>Send</button>
                </div>
                {/* <p>Already have an account? <a href='/login' className='create-link'>Login</a></p> */}
            </div>
        </div>
    );
};

export default ForgotPassword;