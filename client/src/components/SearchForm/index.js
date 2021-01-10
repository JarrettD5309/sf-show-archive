import React from 'react';
import './style.css';

const SearchForm = (props) => {
    const {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        venue,
        setVenue,
        city,
        setCity,
        stateArr,
        stateCountry,
        setStateCountry,
        handleSubmit,
        handleAllShowsSubmit
    } = props;
    return (
        <form className='search-form'>
            <div className='form-row'>
                <div>
                    <label htmlFor='startDate'>Start Date</label><br />
                    <input type='date' id='startDate' name='startDate' value={startDate} onChange={event=>setStartDate(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor='endDate'>End Date (optional)</label><br />
                    <input type='date' id='endDate' name='endDate' value={endDate} onChange={event=>setEndDate(event.target.value)} />
                </div>
                <div>
                    <label htmlFor='venue'>Venue</label><br />
                    <input type='text' id='venue' name='venue' value={venue} onChange={event=>setVenue(event.target.value)} />
                </div>
                <div>
                    <label htmlFor='city'>City</label><br />
                    <input type='text' id='city' name='city' value={city} onChange={event=>setCity(event.target.value)} />
                </div>
                <div>
                    <label htmlFor='stateCountry'>State/Country</label><br />
                    {/* <input type='text' id='stateCountry' name='stateCountry' /> */}
                    <select type='text' id='stateCountry' name='stateCountry' value={stateCountry} onChange={event=>setStateCountry(event.target.value)}>
                        <option value=''></option>
                    {stateArr.map((state,i) => (
                    <option value={state} key={i}>{state}</option>
                ))}
                    </select>
                </div>
                <div>
                    <button className='all-shows-button' type='button' onClick={handleAllShowsSubmit}>All Shows</button>
                </div>
                <div className='search-button-div'>
                    <button className='search-button' type='button' onClick={handleSubmit}>Search</button>
                </div>
            </div>
        </form>
    );
};

export default SearchForm;