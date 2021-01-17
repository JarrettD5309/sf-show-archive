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
    const [city, setCity] = React.useState('');
    const [stateCountry, setStateCountry] = React.useState('');
    const [stateArr, setStateArr] = React.useState([]);

    let resizeTimer;
    window.addEventListener("resize", () => {
        document.body.classList.add("resize-animation-stopper");
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove("resize-animation-stopper");
        }, 400);
    });

    useEffect(()=>{
        axios.get('/api/allstates')
            .then(res=> {
                console.log(res);
                setStateArr(res.data);
            })
            .catch(err=>console.log(err));
    },[]);

    const handleSubmit = () => {
        if (startDate!=='' || endDate!=='' || venue!=='' || city!=='' || stateCountry!=='') {
            console.log(startDate);
            axios.get('/api/shows', {
                params: {
                    startDate: startDate,
                    endDate: endDate,
                    venue: venue,
                    city: city,
                    stateCountry: stateCountry
                }
            })
                .then(res => {
                    console.log(res);
                    if(res.data.length!==0) {
                        setShows(res.data);
                        setFadeShows(true);
                    }
                })
                .catch(err => console.log(err));
        }

    };

    const handleAllShowsSubmit = () => {
        axios.get('/api/shows', {
            params: {
                allShows: true
            }
        })
            .then(res => {
                console.log(res);
                setShows(res.data);
                setFadeShows(true);
            })
            .catch(err => console.log(err));

    };

    const handleBack = () => {
        setFadeShows(false);
        setStartDate('');
        setEndDate('');
        setVenue('');
        setCity('');
        setStateCountry('');
        setTimeout(()=>{
            setShows([]);
        },900);
    };

    return (
        <div className='sub-root'>
            <div className='main-header-div'>
                <div className='child-header-div'>
                    <h1>Search</h1>
                    <h1 className='outline'>&nbsp;Archive</h1>
                </div>
            </div>
                <div className={shows.length===0 ? 'search-form-div' : 'search-form-div off'}>
                <SearchForm 
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                venue={venue}
                setVenue={setVenue}
                city={city}
                setCity={setCity}
                stateArr={stateArr}
                stateCountry={stateCountry}
                setStateCountry={setStateCountry}
                handleSubmit={handleSubmit}
                handleAllShowsSubmit={handleAllShowsSubmit}
            />
            </div>
            
                <div className={fadeShows ? 'fadeIn search-back-button-div' : 'fadeOutSearchBack search-back-button-div'}>
                    <button className='search-back-button' type='button' onClick={handleBack}>Back</button>
                </div>
           
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