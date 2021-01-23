import React from 'react';
import LoginForm from '../../components/LoginForm';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const Login = (props) => {
    let history = useHistory();
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
                console.log(res.data);
                if (res.data==='loggedIn') {
                    props.setLoggedIn(true);
                    history.push('/')
                }
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