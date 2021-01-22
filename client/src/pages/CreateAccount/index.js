import React from 'react';
import CreateAccountForm from '../../components/CreateAccountForm';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const CreateAccount = () => {
    let history = useHistory();
    const [createUsername, setCreateUsername] = React.useState('');
    const [createPassword, setCreatePassword] = React.useState('');
    const [createEmail, setCreateEmail] = React.useState('');
    const [createPasswordConfirm,setCreatePasswordConfirm] = React.useState('');
    const [createInstructions, setCreateInstructions] = React.useState('Please enter details');

    const handleSubmit = () => {

        const newUserObj = {
            username: createUsername,
            email: createEmail,
            password: createPassword,
            passwordConfirm: createPasswordConfirm
        };

        axios.post('/api/user',newUserObj)
            .then(res=>{
                console.log(res);
                setCreateInstructions('Success! Wait to be redirected.');
                setTimeout(()=>{
                    history.push('/login');
                },2000);
            })
            .catch(err=>{
                console.log(err);
                if (err.response.data==='formNotComplete') {
                    setCreateInstructions('Please complete form');
                } else if (err.response.data==='passwordMismatch') {
                    setCreateInstructions('Password confirmation does not match');
                } else if (err.response.data==='usernameLettersNumbers') {
                    setCreateInstructions('Username can only contain letters and numbers');
                } else if (err.response.data==='usernameLength') {
                    setCreateInstructions('Username must be between 4 and 25 characters');
                } else if (err.response.data==='emailNotValid') {
                    setCreateInstructions('Please enter a valid email');
                } else if (err.response.data==='passwordLength') {
                    setCreateInstructions('Password must be between 7 and 100 characters');
                } else if (err.response.data==='userExists') {
                    setCreateInstructions('Username is taken');
                }
            });
    };

    return (
        <CreateAccountForm 
            createUsername={createUsername}
            setCreateUsername={setCreateUsername}
            createPassword={createPassword}
            setCreatePassword={setCreatePassword}
            createEmail={createEmail}
            setCreateEmail={setCreateEmail}
            createPasswordConfirm={createPasswordConfirm}
            setCreatePasswordConfirm={setCreatePasswordConfirm}
            createInstructions={createInstructions}
            handleSubmit={handleSubmit}
        />
    );
};

export default CreateAccount;