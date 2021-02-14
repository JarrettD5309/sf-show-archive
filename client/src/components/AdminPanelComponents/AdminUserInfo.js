import React from 'react';
import './style.css';

const AdminUserInfo = (props) => {
    return (
        <div className='admin-user-info-div'>
            <h2>User Info</h2>
            <p>ID: </p>
            <p>username: </p>
            <p>email: </p>
            <p>twitter: </p>
            <p>instagram: </p>
        </div>
    );
};

export default AdminUserInfo;