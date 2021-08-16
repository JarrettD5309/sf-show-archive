import React, { useEffect } from 'react';
import axios from 'axios';
import ShowInfo from '../../components/ShowInfo';

const LatestUpdates = (props) => {
    const [shows, setShows] = React.useState([]);
    useEffect(() => {
        axios.get('/api/shows/latest')
            .then(res => {
                let showsArr = [];
                res.data.forEach(showDetail => showsArr.push(showDetail.showId));
                setShows(showsArr);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='sub-root'>
            <div className='main-header-div'>
                <div className='child-header-div'>
                    <h1>Latest</h1>
                    <h1 className='outline'>&nbsp;Updates</h1>
                </div>
            </div>

            <div>
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

export default LatestUpdates;