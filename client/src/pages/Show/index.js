import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FullShowInfo from '../../components/FullShowInfo';
import Modal from '../../components/Modal';

const Show = (props) => {
    const { id } = useParams();
    const [showInfo,setShowInfo] = React.useState();
    const [displayModal,setDisplayModal] = React.useState(false);
    const [imageFile, setImageFile] = React.useState();

    const {loggedIn} = props;

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

    const handleFlyerSubmit = () => {
        const formData = new FormData();
    
        formData.append('showId',showInfo._id);
        formData.append('date',showInfo.date);
        formData.append('flyerImg', imageFile);
        console.log(formData);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post('/api/showflyer', formData, config)
            .then(res => {
                console.log(res);
                setDisplayModal(false);
                setImageFile(null);
            })
            .catch(err => {
                console.log(err);
                console.log(err.response.data.message);
                setImageFile(null);
            });
    };

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
                loggedIn={loggedIn}
                setDisplayModal={setDisplayModal}
            />
            {displayModal && <Modal 
                setDisplayModal={setDisplayModal} 
                type='flyer'
                handleFlyerSubmit={handleFlyerSubmit}
                setImageFile={setImageFile} 
            />}
            
            </div>
            }
        </div>
    );
};

export default Show;