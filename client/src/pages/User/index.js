import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserDisplay from '../../components/UserDisplay';

const User = () => {
    const { username } = useParams();
    useEffect(()=>{
        axios.get('/api/publicuser', {
            params: {
                username: username
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
    })

    return (
        <div>
            <p>{username}</p>
            <UserDisplay />
        </div>
    );

};

export default User;