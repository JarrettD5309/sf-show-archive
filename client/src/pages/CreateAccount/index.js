import React from 'react';
import CreateAccountForm from '../../components/CreateAccountForm';

const CreateAccount = () => {
    const [createUsername, setCreateUsername] = React.useState('');
    const [createPassword, setCreatePassword] = React.useState('');
    const [createEmail, setCreateEmail] = React.useState('');
    const [createPasswordConfirm,setCreatePasswordConfirm] = React.useState('');
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
        />
    );
};

export default CreateAccount;