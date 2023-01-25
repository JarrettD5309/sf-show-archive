import React from 'react';
import LoginForm from '../../components/LoginForm';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = (props) => {
    let navigate = useNavigate();
    const [loginUsername, setLoginUsername] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');
    const [loginInstructions, setLoginInstructions] = React.useState('Please enter details');

    const handleSubmit = () => {

        const userObj = {
            username: loginUsername,
            password: loginPassword
        };

        axios.post('/api/login', userObj)
            .then(res => {
                if (res.data === 'loggedIn') {
                    props.setLoggedIn(true);
                    props.getUserInfo();
                    props.checkAdminLogin();
                    navigate('/');
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response.data === 'wrongPassUser') {
                    setLoginInstructions('Incorrect username or password');
                } else if (err.response.data === 'bannedUser') {
                    setLoginInstructions('User is banned');
                }
            });
    };

    return (
        <LoginForm
            loginUsername={loginUsername}
            setLoginUsername={setLoginUsername}
            loginPassword={loginPassword}
            setLoginPassword={setLoginPassword}
            loginInstructions={loginInstructions}
            handleSubmit={handleSubmit}
        />
    );

};

export default Login;