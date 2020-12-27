import React, { useEffect } from "react";
import Timeline from "../../components/Timeline";
import ShowInfo from '../../components/ShowInfo';
import axios from 'axios';
import './style.css';

const TimelinePage = () => {
    const [currentYear, setCurrentYear] = React.useState();
    const [currentMonth, setCurrentMonth] = React.useState();
    const [shows, setShows] = React.useState([]);

    useEffect(()=>{
        if (currentMonth) {
            axios.get('/api/shows/month', {
                params: {
                    month: currentMonth,
                    year: currentYear
                }
            })
                .then(res => setShows(res.data))
                .catch(err => console.log(err));
        }
    },[currentMonth]);

    return (
        <div className='root'>
            <Timeline 
                setCurrentYear={setCurrentYear}
                setCurrentMonth={setCurrentMonth}
            />
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
    );

};

export default TimelinePage;