import React, { useEffect } from "react";
import SearchForm from '../../components/SearchForm';
import ShowInfo from '../../components/ShowInfo';
import axios from 'axios';
import './style.css';

const Search = () => {
    const [shows, setShows] = React.useState([]);
    const [fadeShows, setFadeShows] = React.useState(false);
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [venue, setVenue] = React.useState('');

    let resizeTimer;
    window.addEventListener("resize", () => {
        document.body.classList.add("resize-animation-stopper");
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove("resize-animation-stopper");
        }, 400);
    });

    const handleSubmit = () => {
        axios.get('/api/shows', {
            params: {
                startDate: startDate,
                endDate: endDate,
                venue: venue
            }
        })
            .then(res => {
                console.log(res);
                setShows(res.data);
                setFadeShows(true);
            })
            .catch(err => console.log(err));

    };

    return (
        <div className='sub-root'>
            <div className='main-header-div'>
                <div className='child-header-div'>
                    <h1>Search</h1>
                    <h1 className='outline'>&nbsp;Archive</h1>
                </div>
            </div>
            <SearchForm 
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                venue={venue}
                setVenue={setVenue}
                handleSubmit={handleSubmit}
            />
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