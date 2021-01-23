import React from 'react';
import './style.css';
import dateFunction from '../../other/dateFunction';
import ShowFlyer from '../../images/flyers/2009-08-29-1.jpg';

function FullShowInfo(props) {
    const {showNum, date, venue, address, city, stateCountry} = props;

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
                    <h2>Flyer/Poster</h2>
                    <img src={ShowFlyer} className='full-show-image' />
                </div>
                <div className='full-show-set-list-div'>
                    <h2>Setlist</h2>
                    <p>1. Foulmouth</p>
                    <p>2. Arm Over Arm</p>
                    <p>3. Black Moon</p>
                    <p>4. I'll Make You Sorry</p>
                    <p>5. Starve the Beat</p>
                </div>
            </div>
            <div>
                <h2>Links</h2>
                <div className='full-show-audio-div'>
                    <div className='full-show-link-title-col'>
                    <p className='full-show-slight-bold'>Audio:</p>
                    </div>
                    <div>
                        <p>http://www.livelink.com</p>
                        <p>Contributed By: JD</p>
                    </div>
                </div>
                <div className='full-show-audio-div'>
                    <div className='full-show-link-title-col'>
                    <p className='full-show-slight-bold'>Video:</p>
                    </div>
                    <div>
                        <p>http://www.youtube.com/10001</p>
                        <p>Contributed By: JD</p>
                        <p>http://www.youtube.com/20001</p>
                        <p>Contributed By: DJ</p>
                    </div>
                </div>
            </div>
            <div>
                <h2>Attendance</h2>
            </div>
        </div>
    );
};

export default FullShowInfo;