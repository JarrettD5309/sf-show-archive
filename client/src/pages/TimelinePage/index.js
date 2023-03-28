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
    const [timelineMini, setTimelineMini] = React.useState(false);
    const [mobile, setMobile] = React.useState(window.innerWidth <= 575);
    const [noShows, setNoShows] = React.useState([]);

    const handleResize = () => {
        if (window.innerWidth > 575) {
            setMobile(false);
        } else {
            setMobile(true);
        }
    };

    useEffect(() => {
        axios.get('/api/shows/noshows')
            .then(res => setNoShows(res.data))
            .catch(err => console.log(err));

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

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    });

    const pageBackButton = () => {
        setCurrentYear(undefined);
        setCurrentMonth(undefined);
    };

    const handleUnMini = () => {
        setTimelineMini(false);
        setFadeShows(false);
        setTimeout(() => {
            setShows([]);
            setCurrentMonth(undefined);
        }, 900);
    };

    return (
        noShows.length === 0 ?
            null :
            <div className='sub-root'>
                <div className='main-header-div'>
                    <div className='child-header-div'>
                        <h1>Screaming</h1>
                        <h1>&nbsp;&nbsp;&nbsp;Females</h1>
                        <h1 className='outline'>Tour</h1>
                        <h1 className='outline'>&nbsp;Archive</h1>
                    </div>
                </div>
                <div
                    {...(timelineMini && { onClick: () => { handleUnMini() } })}
                    className={timelineMini ? 'timeline-div mini' : 'timeline-div'}
                >
                    <Timeline
                        setCurrentYear={setCurrentYear}
                        setCurrentMonth={setCurrentMonth}
                        setFadeShows={setFadeShows}
                        pageBackButton={pageBackButton}
                        setTimelineMini={setTimelineMini}
                        mobile={mobile}
                        noShows={noShows}
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
                    {timelineMini && shows.length === 0 &&
                        <h4 className='no-shows-para'>No shows during this month</h4>
                    }
                </div>
            </div>
    );

};

export default TimelinePage;