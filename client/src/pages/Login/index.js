import React from 'react';
import LoginForm from '../../components/LoginForm';

const Login = () => {
    const [loginUsername, setLoginUsername] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');

    return (
        <LoginForm 
            loginUsername={loginUsername}
            setLoginUsername={setLoginUsername}
            loginPassword={loginPassword}
            setLoginPassword={setLoginPassword}
        />
    );

};

export default Login;