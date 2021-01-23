import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FullShowInfo from '../../components/FullShowInfo';

const Show = () => {
    const { id } = useParams();
    const [showInfo,setShowInfo] = React.useState();

    useEffect(() => {
        axios.get('/api/shows', {
            params: {
                startDate: '',
                endDate: '',
                venue: '',
                city: '',
                stateCountry: '',
                showNum: id
            }
        })
            .then(res => {
                console.log(res);
                setShowInfo(res.data[0]);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            {showInfo && 
            <div>
            <FullShowInfo 
                showNum={showInfo.showNum}
                date={showInfo.date}
                venue={showInfo.venue}
                address={showInfo.address}
                city={showInfo.city}
                stateCountry={showInfo.stateCountry}
            />
          
            </div>
            }
        </div>
    );
};

export default Show;