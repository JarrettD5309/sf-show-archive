import React, { useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {

    const handleRun = () => {
        axios.get('/special/attendance')
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
    };

    return (
        <div>
            <button onClick={handleRun}>
                Run
            </button>
        </div>
    );
};

export default Attendance;