import React from 'react';
import CreateAccountForm from '../../components/CreateAccountForm';
import { useNavigate } from "react-router";
import axios from 'axios';

const CreateAccount = () => {
    let navigate = useNavigate();
    const [createUsername, setCreateUsername] = React.useState('');
    const [createPassword, setCreatePassword] = React.useState('');
    const [createEmail, setCreateEmail] = React.useState('');
    const [createPasswordConfirm, setCreatePasswordConfirm] = React.useState('');
    const [createInstructions, setCreateInstructions] = React.useState('Please enter details');
    const [otherField,setOtherField] = React.useState('');

    const handleSubmit = () => {

        // stops bots from signing up
        if (otherField!=='') {
            setTimeout(() => {
                navigate('/login');
            }, 1500);
            return;
        }

        const newUserObj = {
            username: createUsername,
            email: createEmail,
            password: createPassword,
            passwordConfirm: createPasswordConfirm
        };

        axios.post('/api/user', newUserObj)
            .then(res => {
                setCreateInstructions('Success! Wait to be redirected.');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            })
            .catch(err => {
                console.log(err);
                if (err.response.data === 'formNotComplete') {
                    setCreateInstructions('Please complete form');
                } else if (err.response.data === 'passwordMismatch') {
                    setCreateInstructions('Password confirmation does not match');
                } else if (err.response.data === 'usernameLettersNumbers') {
                    setCreateInstructions('Username can only contain letters and numbers');
                } else if (err.response.data === 'usernameLength') {
                    setCreateInstructions('Username must be between 4 and 25 characters');
                } else if (err.response.data === 'emailNotValid') {
                    setCreateInstructions('Please enter a valid email');
                } else if (err.response.data === 'passwordLength') {
                    setCreateInstructions('Password must be between 7 and 100 characters');
                } else if (err.response.data === 'userExists') {
                    setCreateInstructions('Username is taken');
                } else if (err.response.data === 'emailExists') {
                    setCreateInstructions('Email has already been used');
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
            otherField={otherField}
            setOtherField={setOtherField}
            handleSubmit={handleSubmit}
        />
    );
};

export default CreateAccount;