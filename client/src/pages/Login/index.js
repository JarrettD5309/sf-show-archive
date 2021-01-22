import React from 'react';
import LoginForm from '../../components/LoginForm';
import axios from 'axios';

const Login = () => {
    const [loginUsername, setLoginUsername] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');
    const [loginInstructions, setLoginInstructions] = React.useState('Please enter details');

    const handleSubmit = () => {

        const userObj = {
            username: loginUsername,
            password: loginPassword
        };

        axios.post('/api/login',userObj)
            .then(res=>{
                console.log(res);

            })
            .catch(err=>{
                console.log(err);
                if (err.response.data==='wrongPassUser') {
                    setLoginInstructions('Incorrect username or password');
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