import React from 'react';
import './style.css';

const SearchForm = () => {
    return (
        <form className='search-form'>
            <div className='form-row'>
                <div>
                    <label for='startDate'>Start Date</label><br />
                    <input type='date' id='startDate' name='startDate' />
                </div>
                <div>
                    <label for='endDate'>End Date (optional)</label><br />
                    <input type='date' id='endDate' name='endDate' />
                </div>
                <div>
                    <label for='venue'>Venue</label><br />
                    <input type='text' id='venue' name='venue' />
                </div>
                <div>
                    <label for='city'>City</label><br />
                    <input type='text' id='city' name='city' />
                </div>
                <div>
                    <label for='stateCountry'>State/Country</label><br />
                    <input type='text' id='stateCountry' name='stateCountry' />
                </div>
                <div>
                    <button className='all-shows-button' type='button'>All Shows</button>
                </div>
                <div className='search-button-div'>
                    <button className='search-button' type='button'>Search</button>
                </div>
            </div>
        </form>
    );
};

export default SearchForm;