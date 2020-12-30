import React from 'react';
import './style.css';

function ShowInfo(props) {
    const {showNum, date, venue, address, city, stateCountry} = props;
    return (
        <div className='grid-container'>
            <div className='date'>{date}</div>
            <div className='show-num'># {showNum}</div>
            <div className='venue-title'>Venue:</div>
            <div className='venue'>{venue}</div>
            <div className='address-title'>Address:</div>
            <div className='street'>{address}</div>
            <div className='city'>{city}, {stateCountry}</div>
            {/* <p>{showNum} - {date} - {venue} - {address} - {city} - {stateCountry}</p> */}
        </div>
    );
};

export default ShowInfo;