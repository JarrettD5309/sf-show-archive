import React from 'react';
import './style.css';
import dateFunction from '../../other/dateFunction';

function ShowInfo(props) {
    const {showNum, date, venue, address, city, stateCountry} = props;

    const dateString = dateFunction(date);

    return (
        <div className='show-info-container'>
            <div className='grid-container'>
                <div className='date'><h4 className='show-date-heading'>{dateString}</h4></div>
                <div className='show-num'># {showNum}</div>
                <div className='venue-title'><p className='slight-bold'>Venue:</p></div>
                <div className='venue'>{venue}</div>
                <div className='address-title'><p className='slight-bold'>Address:</p></div>
                <div className='street'>{address}</div>
                <div className='city'>{city}, {stateCountry}</div>
            </div>
            <div className='show-info-border'></div>
        </div>
    );
};

export default ShowInfo;