import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FullShowInfo from '../../components/FullShowInfo';
import Modal from '../../components/Modal';

const Show = (props) => {
    const { id } = useParams();
    const [showInfo, setShowInfo] = React.useState();
    const [displayModal, setDisplayModal] = React.useState(false);
    const [imageFile, setImageFile] = React.useState();
    const [imageFileName, setImageFileName] = React.useState('');

    const { loggedIn } = props;

    useEffect(() => {
        // deals with react unmounted component issue
        let mounted = true;
        
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
                    if (mounted) {
                    setShowInfo(res.data[0]);
                    }
                })
                .catch(err => console.log(err));

        return () => mounted = false;
    }, []);

    const handleFlyerSubmit = () => {
        const formData = new FormData();

        formData.append('showId', showInfo._id);
        formData.append('date', showInfo.date);
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
                setImageFileName('')
            })
            .catch(err => {
                console.log(err);
                console.log(err.response.data.message);
                setImageFile(null);
                setImageFileName('')
            });
    };

    const handleCloseModal = (type) => {
        setDisplayModal(false);

        if (type === 'flyer') {
            setImageFileName('');
            setImageFile(null);
        }
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
                        type='flyer'
                        handleFlyerSubmit={handleFlyerSubmit}
                        setImageFile={setImageFile}
                        imageFileName={imageFileName}
                        setImageFileName={setImageFileName}
                        handleCloseModal={handleCloseModal}
                    />}

                </div>
            }
        </div>
    );
};

export default Show;