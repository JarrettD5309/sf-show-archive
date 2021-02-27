import React from 'react';
import axios from 'axios';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';

const ForgotPassword = () => {
    const [resetEmail, setResetEmail] = React.useState('');
    const [forgotPasswordInstructions, setForgotPasswordInstructions] = React.useState('Enter the email of your account');

    const handleSubmit = () => {
        const resetObj = {
            email: resetEmail
        };

        axios.post('/api/forgot-password', resetObj)
            .then(res => {
                setForgotPasswordInstructions('Check your email for reset link');
                setResetEmail('');
            })
            .catch(err => console.log(err));
    };

    return (
        <ForgotPasswordForm
            resetEmail={resetEmail}
            setResetEmail={setResetEmail}
            handleSubmit={handleSubmit}
            forgotPasswordInstructions={forgotPasswordInstructions}
        />
    );
};

export default ForgotPassword;