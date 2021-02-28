import React from 'react';
import './style.css';

const AdminShowInfo = (props) => {
    const {
        searchShowNum,
        setSearchShowNum,
        handleShowSearch,
        handleOpenModal
    } = props;

    const {
        _id,
        showNum,
        date,
        venue,
        address,
        city,
        stateCountry
    } = props.showInfo;
    return (
        <div className='admin-show-info-div'>
            <h2 className='admin-margin-bottom'>Show Info</h2>
            <div className='admin-margin-bottom'>
                <label htmlFor='admin-show-num'>ShowNum</label><br />
                <input 
                    type='text'
                    id='admin-show-num'
                    name='admin-show-num'
                    value={searchShowNum}
                    onChange={event => setSearchShowNum(event.target.value)}
                /><br />
                <button type='button' className='admin-button' onClick={handleShowSearch}>Search</button>
            </div>

            <p className='admin-margin-bottom'><span className='slight-bold'>ID:</span> {_id}</p>
            <p className='admin-margin-bottom'><span className='slight-bold'>showNum:</span> {showNum}</p>
            <p className='admin-margin-bottom'><span className='slight-bold'>date:</span> {date}</p>
            <p className='admin-margin-bottom'><span className='slight-bold'>venue:</span> {venue}</p>
            <p className='admin-margin-bottom'><span className='slight-bold'>address:</span> {address}</p>
            <p className='admin-margin-bottom'><span className='slight-bold'>city:</span> {city}</p>
            <p className='admin-margin-bottom'><span className='slight-bold'>stateCountry:</span> {stateCountry}</p>
            <button type='button' className='admin-button' onClick={()=>handleOpenModal('showInfo')}>Edit</button>
        </div>
    )
};

export default AdminShowInfo;