import React, { useEffect } from "react";
import ShowInfo from '../../components/ShowInfo';
import axios from 'axios';
import './style.css';

const Search = () => {
    const [shows, setShows] = React.useState([]);
    const [fadeShows, setFadeShows] = React.useState(false);

    return (
        <div className='sub-root'>
            <div className='main-header-div'>
                <div className='child-header-div'>
                    <h1>Search</h1>
                    <h1 className='outline'>&nbsp;Archive</h1>
                </div>
            </div>
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
                </div>
                <div className='form-row'>
                    <div>
                        <label for='city'>City</label><br />
                        <input type='text' id='city' name='city' />
                    </div>
                    <div>
                        <label for='stateCountry'>State/Country</label><br />
                        <input type='text' id='stateCountry' name='stateCountry' />
                    </div>
                </div>
            </form>
            <div className={fadeShows ? 'fadeIn' : 'fadeOut'} >
                {shows.map(show => (
                    <ShowInfo
                        showNum={show.showNum}
                        date={show.date}
                        venue={show.venue}
                        address={show.address}
                        city={show.city}
                        stateCountry={show.stateCountry}
                        key={show.showNum}
                    />
                ))}
            </div>
        </div>
    );

};

export default Search;