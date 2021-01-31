import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FullShowInfo from '../../components/FullShowInfo';
import Modal from '../../components/Modal';

const Show = (props) => {
    const { id } = useParams();
    const [showInfo, setShowInfo] = React.useState();
    const [showInfoDetails, setShowInfoDetails] = React.useState();
    const [displayModal, setDisplayModal] = React.useState(false);
    const [modalType, setModalType] = React.useState('');
    const [imageFile, setImageFile] = React.useState();
    const [imageFileName, setImageFileName] = React.useState('');
    const [flyerInstructions, setFlyerInstructions] = React.useState('Please choose a image');
    const [setListArr, setSetListArr] = React.useState([]);
    const [setlistInstructions, setSetListInstructions] = React.useState('Please add songs');
    const [linksInstructions,setLinkInstructions] = React.useState('Please add a link');

    const { loggedIn } = props;

    useEffect(() => {
        // deals with react unmounted component issue
        let mounted = true;

        axios.get('/api/showdetails', {
            params: {
                showNum: id
            }
        })
            .then(res => {
                // console.log(res);
                if (mounted) {
                    setShowInfoDetails(res.data[0]);
                    setShowInfo(res.data[1]);
                    if (res.data[0]) {
                        setSetListArr(res.data[0].setList.songs);
                    }

                }
            })
            .catch(err => console.log(err));

        return () => mounted = false;
    }, []);

    const getDetails = () => {
        axios.get('/api/showdetails', {
            params: {
                showNum: id
            }
        })
            .then(res => {
                // console.log(res);
                setShowInfoDetails(res.data[0]);
                setShowInfo(res.data[1]);
                if (res.data[0]) {
                    setSetListArr(res.data[0].setList.songs);
                }
            })
            .catch(err => console.log(err));
    };

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
                setFlyerInstructions('Success!');
                setTimeout(() => {
                    handleCloseModal('flyer');
                    // setImageFile(null);
                    // setImageFileName('');
                    // setFlyerInstructions('Please choose a image');
                    getDetails();
                }, 900);
            })
            .catch(err => {
                console.log(err);
                console.log(err.response.data.message);
                setFlyerInstructions(err.response.data.message);
                setImageFile(null);
                setImageFileName('')
            });
    };

    const handleSetlistSubmit = () => {
        let newSetlist = [];
        const inputArr = document.getElementsByClassName('modal-setlist-input');
        console.log(inputArr.length);
        for (let i = 0; i < inputArr.length; i++) {
            const currentInput = document.getElementById('song' + i);
            console.log(currentInput.value);
            if (currentInput.value !== '') {
                newSetlist.push(currentInput.value);
            }
        }
        console.log(newSetlist);
        const setlistData = {
            showId: showInfo._id,
            setlist: newSetlist
        }
        axios.post('/api/setlist', setlistData)
            .then(res => {
                console.log(res);
                setSetListInstructions('Success!')
                setTimeout(() => {
                    // setDisplayModal(false);
                    handleCloseModal('setlist');
                    // setImageFile(null);
                    // setImageFileName('');
                    // setSetListInstructions('Please add songs');
                    getDetails();
                }, 900);
            })
            .catch(err => console.log(err));
    };

    const handleCloseModal = (type) => {
        setDisplayModal(false);
        document.body.style.overflowY = 'visible';

        if (type === 'flyer') {
            setImageFileName('');
            setImageFile(null);
            setFlyerInstructions('Please choose a image');
        } else if (type='setlist') {
            setSetListInstructions('Please add songs');
        }
    };

    const handleOpenModal = (type) => {
        setModalType(type);
        setDisplayModal(true);
        document.body.style.overflowY = 'hidden';
    };

    return (
        <div>
            {showInfo &&
                <div>
                    <FullShowInfo
                        showInfo={showInfo}
                        showInfoDetails={showInfoDetails}
                        loggedIn={loggedIn}
                        handleOpenModal={handleOpenModal}
                    />
                    {displayModal && <Modal
                        type={modalType}
                        handleFlyerSubmit={handleFlyerSubmit}
                        setImageFile={setImageFile}
                        imageFileName={imageFileName}
                        setImageFileName={setImageFileName}
                        handleCloseModal={handleCloseModal}
                        flyerInstructions={flyerInstructions}
                        handleSetlistSubmit={handleSetlistSubmit}
                        setlistInstructions={setlistInstructions}
                        setListArr={setListArr}
                        linksInstructions={linksInstructions}
                    />}

                </div>
            }
        </div>
    );
};

export default Show;