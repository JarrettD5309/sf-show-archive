import React, { useEffect } from 'react';
import axios from 'axios';
import { FacebookLoginButton } from 'react-social-login-buttons';

const Attendance = () => {

    const handleRun = () => {
        axios.get('/special/attendance')
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
    };

    return (
        <div>
            <FacebookLoginButton onClick={()=>console.log('hello')} />
            {/* <button onClick={handleRun}>
                Run
            </button> */}
        </div>
    );
};

export default Attendance;