import React, { useEffect } from "react";
import ShowInfo from '../components/ShowInfo'
import axios from 'axios';



function HomePage() {
    const [shows, setShows] = React.useState([]);

    useEffect(() => {
        function loadShows() {
            axios.get('/api')
                .then(res => setShows(res.data))
                .catch(err => console.log(err));
        };

        loadShows();
    }, []);

    return (
        <div>
            <h1>TEST</h1>
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



export default HomePage;