import React, { useEffect } from 'react';

const Profile = (props) => {

    useEffect(()=>{
        console.log('props: ' + JSON.stringify(props.userInfo));
    });

    const {
        email,
        username
    } = props.userInfo;

    return (
        <div>
            <h1>Profile</h1>
            <p>{username}</p>
            <p>{email}</p>
        </div>
    );

};

export default Profile;