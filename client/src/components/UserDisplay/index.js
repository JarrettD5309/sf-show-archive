import React from 'react';
import './style.css';

const UserDisplay = (props) => {
    const {
        username,
        twitter,
        instagram
    } = props.userInfo;

    const {
        contributedArray,
        attendedArray
    } = props;
    return (
        <div className='sub-root'>
            <div className='main-header-div'>
                <div className='child-header-div'>
                    <h1>User</h1>
                </div>
            </div>
            <div className='profile-sub-container'>
                <div className='profile-info-div'>
                    <div className='profile-info-type'>
                        <p className='slight-bold'>Username:</p>
                    </div>
                    <div className='profile-info-details'>
                        <p>{username}</p>
                    </div>
                </div>
                <div className='profile-info-div'>
                    <div className='profile-info-type'>
                        <p className='slight-bold'>Twitter:</p>
                    </div>
                    <div className='profile-info-details'>
                        <p>{twitter === '' ? 'N/A' : <a href={twitter} target='_blank' rel="noopener noreferrer" className='profile-info-link'>{twitter}</a>}</p>
                    </div>
                </div>
                <div className='profile-info-div'>
                    <div className='profile-info-type'>
                        <p className='slight-bold'>Instagram:</p>
                    </div>
                    <div className='profile-info-details'>
                        <p>{instagram === '' ? 'N/A' : <a href={instagram} target='_blank' rel="noopener noreferrer" className='profile-info-link'>{instagram}</a>}</p>
                    </div>
                </div>
                <div className='profile-info-div'>
                    <div className='profile-info-type'>
                        <p className='slight-bold'>Contributions:</p>
                    </div>
                    <div className='profile-info-details'>
                        <p>{contributedArray.length === 0 ? 'N/A' : contributedArray.map((date, i) => {
                            if (i < (contributedArray.length - 1)) {
                                return <span key={i}><a href={`/show/${date.showNum}`} className='profile-date-link'>{date.dateString}</a>, </span>;
                            } else {
                                return <span key={i}><a href={`/show/${date.showNum}`} className='profile-date-link'>{date.dateString}</a></span>;
                            }

                        })}</p>
                    </div>
                </div>
                <div className='profile-info-div'>
                    <div className='profile-info-type'>
                        <p className='slight-bold'>Attended:</p>
                    </div>
                    <div className='profile-info-details'>
                        <p>{attendedArray.length === 0 ? 'N/A' : attendedArray.map((date, i) => {
                            if (i < (attendedArray.length - 1)) {
                                return <span key={i}><a href={`/show/${date.showNum}`} className='profile-date-link'>{date.dateString}</a>, </span>;
                            } else {
                                return <a href={`/show/${date.showNum}`} className='profile-date-link' key={i}>{date.dateString}</a>;
                            }

                        })}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDisplay;