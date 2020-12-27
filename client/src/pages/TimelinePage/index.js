import React, { useEffect } from "react";
import Timeline from "../../components/Timeline";
import ShowInfo from '../../components/ShowInfo';
import axios from 'axios';
import './style.css';

const TimelinePage = (props) => {
    const [currentYear, setCurrentYear] = React.useState();
    const [currentMonth, setCurrentMonth] = React.useState();
    const [shows, setShows] = React.useState([]);
    const [fadeShows, setFadeShows] = React.useState(false);

    useEffect(() => {
        if (currentMonth) {
            axios.get('/api/shows/month', {
                params: {
                    month: currentMonth,
                    year: currentYear
                }
            })
                .then(res => {
                    setShows(res.data);
                    setFadeShows(true);
                })
                .catch(err => console.log(err));
        }
    }, [currentMonth]);

    const pageBackButton = () => {
        setCurrentYear(undefined);
        setCurrentMonth(undefined);
        setFadeShows(false);
        setTimeout(()=>{setShows([])},1100);
    };

    return (
        <div className='root'>
            <div className='main-header-div'>
                <div className='child-header-div'>
                    <h1>Screaming</h1>
                        <h1>&nbsp;&nbsp;&nbsp;Females</h1>
                    <h1 className='outline'>Tour</h1>
                    <h1 className='outline'>&nbsp;Archive</h1>
                </div>
            </div>
            <div className='timeline'>
                <Timeline
                    setCurrentYear={setCurrentYear}
                    setCurrentMonth={setCurrentMonth}
                    setFadeShows={setFadeShows}
                    pageBackButton={pageBackButton}
                />
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

export default TimelinePage;