import React, { useEffect } from 'react';
import './style.css';
import dateFunction from '../../other/dateFunction';
import ShowFlyer from '../../images/flyers/2009-08-29-1.jpg';

function FullShowInfo(props) {

    useEffect(() => {
        console.log(props.showInfo);
        console.log(props.showInfoDetails);
    });

    const {

        loggedIn,
        handleOpenModal
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
    let setList = {songs: []};
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
            {/* <div className='full-show-info-border'></div> */}
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
                                <img src={`/uploads/${imgName}`} className='full-show-image' alt={`Flyer from ${date}`} key={eachFlyer._id} />
                                <p>Contributed by: {username}</p>
                            </div>
                        )
                    }
                    ) :
                        (<p>N/A</p>)
                    }
                    {/* <img src={ShowFlyer} className='full-show-image' /> */}
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
                            <p>Contributed by: {setList.contributed.username} </p>
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
                        <p>http://www.livelink.com</p>
                        <p>Contributed By: JD</p>
                    </div>
                </div>
                <div className='full-show-link-div'>
                    <div className='full-show-link-title-col'>
                        <p className='full-show-slight-bold'>Video:</p>
                    </div>
                    <div className='full-show-links-details'>
                        <p>http://www.youtube.com/10001/alotmorestuffoverheretoseewhathappens</p>
                        <p>Contributed By: JD</p>
                        <p>http://www.youtube.com/20001</p>
                        <p>Contributed By: DJ</p>
                    </div>
                </div>
                <div className='full-show-link-div'>
                    <div className='full-show-link-title-col'>
                        <p className='full-show-slight-bold'>Review:</p>
                    </div>
                    <div className='full-show-links-details'>
                        <p>http://www.myblog.com</p>
                        <p>Contributed By: JD</p>
                        <p>http://www.villagevoice.com</p>
                        <p>Contributed By: DJ</p>
                    </div>
                </div>
            </div>
            <div>
                <div className='full-show-header-margin'>
                    <h2>Attendance</h2>
                    {loggedIn && <button className='full-show-add-button' type='button'>ADD</button>}
                </div>
            </div>
        </div>
    );
};

export default FullShowInfo;