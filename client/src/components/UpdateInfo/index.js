import React from 'react';
import './style.css';
import dateFunction from '../../other/dateFunction';
import { useNavigate } from "react-router-dom";

function UpdateInfo(props) {
    let navigate = useNavigate();
    const { section, date, user, showNum } = props;

    const dateString = dateFunction(date);

    const handleClick = () => {
        navigate(`/show/${showNum}`);
    };

    return (
        // <p>{section} {dateString} {user.username} </p>
        <div className='update-grid-container' onClick={handleClick}>
            <div className='update-section-title'><p className='slight-bold'>Updated:</p></div>
            <div className='update-section'>{section}</div>
            <div className='update-date-title'><p className='slight-bold'>On:</p></div>
            <div className='update-date'>{dateString}</div>
            <div className='update-user-title'><p className='slight-bold'>By:</p></div>
            <div className='update-user'>{user.username}</div>
        </div>
    );
};

export default UpdateInfo;