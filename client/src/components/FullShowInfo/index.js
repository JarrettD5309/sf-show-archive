import React from 'react';
import './style.css';
import dateFunction from '../../other/dateFunction';

function FullShowInfo(props) {

    const {
        loggedIn,
        handleOpenModal,
        userInfo
    } = props;

    const {
        showNum,
        date,
        venue,
        address,
        city,
        stateCountry
    } = props.showInfo;

    let attendance = [];
    let audio = [];
    let flyer = [];
    let review = [];
    let setList = { songs: [] };
    let video = [];

    if (props.showInfoDetails) {
        attendance = props.showInfoDetails.attendance;
        audio = props.showInfoDetails.audio;
        flyer = props.showInfoDetails.flyer;
        review = props.showInfoDetails.review;
        setList = props.showInfoDetails.setList;
        video = props.showInfoDetails.video;
    }

    const dateString = dateFunction(date);

    const attendButton = () => {
        let found = false;
        for (let i = 0; i < attendance.length; i++) {
            if (userInfo._id === attendance[i]._id) {
                found = true;
            }
        }
        return found;
    }

    return (
        <div className='full-show-info-container'>
            <div className='full-show-grid-container' >
                <div className='full-show-date'><h4 className='full-show-date-heading'>{dateString}</h4></div>
                <div className='full-show-num'># {showNum}</div>
                <div className='full-show-venue-title'><p className='full-show-slight-bold'>Venue:</p></div>
                <div className='full-show-venue'>{venue}</div>
                <div className='full-show-address-title'><p className='full-show-slight-bold'>Address:</p></div>
                <div className='full-show-street'>{address}</div>
                <div className='full-show-city'>{city}, {stateCountry}</div>
            </div>
            <div className='full-show-flyer-set-div'>
                <div className='full-show-flyer-div'>
                    <div className='full-show-header-margin'>
                        <h2>Flyer</h2>
                        {loggedIn && <button className='full-show-add-button' type='button' onClick={() => handleOpenModal('flyer')}>ADD</button>}
                    </div>
                    {flyer.length !== 0 ? flyer.map(eachFlyer => {
                        const imgName = eachFlyer.flyerImg;
                        const username = eachFlyer.contributed.username;
                        return (
                            <div key={eachFlyer._id}>
                                <img src={process.env.PUBLIC_URL + `/uploads/${imgName}`} className='full-show-image' alt={`Flyer from ${date}`} key={eachFlyer._id} />
                                <p>Contributed by: <a href={`/user/${username}`} className='full-show-links-link'>{username}</a></p>
                            </div>
                        )
                    }
                    ) :
                        (<p>N/A</p>)
                    }
                </div>
                <div className='full-show-set-list-div'>
                    <div className='full-show-header-margin'>
                        <h2>Setlist</h2>
                        {loggedIn && <button className='full-show-add-button' type='button' onClick={() => handleOpenModal('setlist')}>ADD</button>}
                    </div>
                    {setList.songs.length !== 0 ? (
                        <div>
                            {setList.songs.map((song, i) =>
                                <p key={i}>{i + 1}. {song}</p>
                            )}
                            <p>Contributed by: <a href={`/user/${setList.contributed.username}`} className='full-show-links-link'>{setList.contributed.username}</a></p>
                        </div>

                    ) :
                        (<p>N/A</p>)
                    }
                </div>
            </div>
            <div>
                <div className='full-show-header-margin'>
                    <h2>Links</h2>
                    {loggedIn && <button className='full-show-add-button' type='button' onClick={() => handleOpenModal('links')}>ADD</button>}
                </div>
                <div className='full-show-link-div'>
                    <div className='full-show-link-title-col'>
                        <p className='full-show-slight-bold'>Audio:</p>
                    </div>
                    <div className='full-show-links-details'>
                        {audio.length !== 0 ? audio.map((object, i) => (
                            <div key={i} className='full-show-links-map-div'>
                                <p><a href={object.link} target='_blank' rel="noopener noreferrer" className='full-show-links-link'>{object.link}</a></p>
                                <p>Contributed by: <a href={`/user/${object.contributed.username}`} className='full-show-links-link'>{object.contributed.username}</a></p>
                            </div>
                        ))
                            :
                            (<p>N/A</p>)
                        }
                    </div>
                </div>
                <div className='full-show-link-div'>
                    <div className='full-show-link-title-col'>
                        <p className='full-show-slight-bold'>Video:</p>
                    </div>
                    <div className='full-show-links-details'>
                        {video.length !== 0 ? video.map((object, i) => (
                            <div key={i} className='full-show-links-map-div'>
                                <p><a href={object.link} target='_blank' rel="noopener noreferrer" className='full-show-links-link'>{object.link}</a></p>
                                <p>Contributed by: <a href={`/user/${object.contributed.username}`} className='full-show-links-link'>{object.contributed.username}</a></p>
                            </div>
                        ))
                            :
                            (<p>N/A</p>)
                        }
                    </div>
                </div>
                <div className='full-show-link-div'>
                    <div className='full-show-link-title-col'>
                        <p className='full-show-slight-bold'>Review:</p>
                    </div>
                    <div className='full-show-links-details'>
                        {review.length !== 0 ? review.map((object, i) => (
                            <div key={i} className='full-show-links-map-div'>
                                <p><a href={object.link} target='_blank' rel="noopener noreferrer" className='full-show-links-link'>{object.link}</a></p>
                                <p>Contributed by: <a href={`/user/${object.contributed.username}`} className='full-show-links-link'>{object.contributed.username}</a></p>
                            </div>
                        ))
                            :
                            (<p>N/A</p>)
                        }
                    </div>
                </div>
            </div>
            <div>
                <div className='full-show-header-margin'>
                    <h2>Attendance</h2>
                    {loggedIn &&
                        <button className='full-show-add-button' type='button' onClick={() => {
                            attendButton() ?
                                handleOpenModal('attendance-remove') :
                                handleOpenModal('attendance')
                                ;
                        }}>ADD</button>
                    }
                </div>
                <div>
                    {attendance.length !== 0 ? attendance.map((user, i) => {
                        if (i < (attendance.length - 1)) {
                            return <span key={i}><a href={`/user/${attendance[i].username}`} className='full-show-links-link'>{attendance[i].username}</a>, </span>;
                        } else {
                            return <a href={`/user/${attendance[i].username}`} className='full-show-links-link' key={i}>{attendance[i].username}</a>;
                        }

                    }) :
                        (<p>N/A</p>)}
                </div>
            </div>
        </div>
    );
};

export default FullShowInfo;