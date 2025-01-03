import React, { useEffect } from 'react';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const ResetPassword = () => {
    let navigate = useNavigate();
    const { token, email } = useParams();
    const [loading, setLoading] = React.useState(true);
    const [showForm, setShowForm] = React.useState(false);
    const [resetPassword, setResetPassword] = React.useState('');
    const [resetPasswordConfirm, setResetPasswordConfirm] = React.useState('');
    const [resetPasswordInstructions, setResetPasswordInstructions] = React.useState('Token has expired. Please try reset again.');

    useEffect(() => {
        axios.get('/api/reset-password', {
            params: {
                email: email,
                token: token
            }
        })
            .then(res => {
                if (res.data === 'showForm') {
                    setShowForm(true);
                    setResetPasswordInstructions('Please enter a new password');
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response.data === 'tokenExpired') {
                    setShowForm(false);
                    setResetPasswordInstructions('Token has expired. Please try reset again.');
                }
            })
            .then(() => {
                setLoading(false);
            });
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
                setResetPasswordInstructions('Success! Wait to be redirected.');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            })
            .catch(err => {
                console.log(err);
                if (err.response.data === 'formNotComplete') {
                    setResetPasswordInstructions('Please complete form');
                } else if (err.response.data === 'tokenNotFound') {
                    setShowForm(false);
                    setResetPasswordInstructions('Token has expired. Please try reset again.');
                } else if (err.response.data === 'passwordMismatch') {
                    setResetPasswordInstructions('Password confirmation does not match');
                } else if (err.response.data === 'passwordLength') {
                    setResetPasswordInstructions('Password must be between 7 and 100 characters');
                }
            });
    };

    return (
        loading ? null :
            <ResetPasswordForm
                showForm={showForm}
                resetPassword={resetPassword}
                setResetPassword={setResetPassword}
                resetPasswordConfirm={resetPasswordConfirm}
                setResetPasswordConfirm={setResetPasswordConfirm}
                resetPasswordInstructions={resetPasswordInstructions}
                handleSubmit={handleSubmit}
            />
    );
};

export default ResetPassword;