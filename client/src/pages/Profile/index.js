import React, { useEffect } from 'react';
import dateFunction from '../../other/dateFunction';
import axios from 'axios';
import './style.css';

const Profile = (props) => {

    const [attendedArray, setAttendedArray] = React.useState([]);
    const [contributedArray, setContributedArray] = React.useState([]);

    const {
        email,
        username,
        _id
    } = props.userInfo;

    useEffect(()=>{
        console.log('props: ' + JSON.stringify(props.userInfo));
        const getShowsAttended = ()=> {
            axios.get('/api/userattendance', {
                params: {
                    userID: _id
                }
            })
            .then(res=>{
                console.log(res.data);
                const attendedDates = res.data[0].map(show=>{
                   const dateString = dateFunction(show.showId.date,true);
                   return {
                       dateString: dateString,
                       showNum: parseInt(show.showId.showNum)
                    };
                });
                attendedDates.sort((a, b) => a.showNum - b.showNum);
                setAttendedArray(attendedDates);

                const contributedDates = res.data[1].map(show=>{
                   const dateString = dateFunction(show.showId.date,true);
                   return {
                       dateString: dateString,
                       showNum: parseInt(show.showId.showNum)
                    };
                });
                contributedDates.sort((a, b) => a.showNum - b.showNum);
                setContributedArray(contributedDates);
            })
            .catch(err=>{
                console.log(err);
            })
        };

        getShowsAttended();
    },[]);

    useEffect(()=>{
        console.log(JSON.stringify(contributedArray));
    });

    

    return (
        <div className='sub-root'>
            <div className='main-header-div'>
                <div className='child-header-div'>
                <h1>Profile</h1>
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
                        <p className='slight-bold'>Email:</p>
                    </div>
                    <div className='profile-info-details'>
                        <p>{email}</p>
                    </div>
                </div>
                <div className='profile-info-div'>
                    <div className='profile-info-type'>
                        <p className='slight-bold'>Twitter:</p>
                    </div>
                    <div className='profile-info-details'>
                        <p>@official_screamales</p>
                    </div>
                </div>
                <div className='profile-info-div'>
                    <div className='profile-info-type'>
                        <p className='slight-bold'>Instagram:</p>
                    </div>
                    <div className='profile-info-details'>
                        <p>@official_screamales</p>
                    </div>
                </div>
                <div className='profile-info-div'>
                    <div className='profile-info-type'>
                        <p className='slight-bold'>Contributions:</p>
                    </div>
                    <div className='profile-info-details'>
                    <p>{contributedArray.map((date,i) => {
                            if (i<(contributedArray.length-1)) {
                                return <span key={i}><a href={`/show/${date.showNum}`} className='profile-date-link'>{date.dateString}</a>, </span>;
                            } else {
                                return <a href={`/show/${date.showNum}`} className='profile-date-link' key={i}>{date.dateString}</a>;
                            }
                            
                            })}</p>
                    </div>
                </div>
                <div className='profile-info-div'>
                    <div className='profile-info-type'>
                        <p className='slight-bold'>Attended:</p>
                    </div>
                    <div className='profile-info-details'>
                        <p>{attendedArray.map((date,i) => {
                            if (i<(attendedArray.length-1)) {
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

export default Profile;