import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FullShowInfo from '../../components/FullShowInfo';
import Modal from '../../components/Modal';
import imageCompression from 'browser-image-compression';
import axios from 'axios';

const Show = (props) => {
    const { id } = useParams();
    const [showInfo, setShowInfo] = React.useState();
    const [showInfoDetails, setShowInfoDetails] = React.useState();
    const [displayModal, setDisplayModal] = React.useState(false);
    const [modalType, setModalType] = React.useState('');
    const [imageFile, setImageFile] = React.useState();
    const [imageFileName, setImageFileName] = React.useState('');
    const [flyerInstructions, setFlyerInstructions] = React.useState('Please choose a image. (upload may take a moment)');
    const [setListArr, setSetListArr] = React.useState([]);
    const [setlistInstructions, setSetListInstructions] = React.useState('Please add songs');
    const [newAudioLink, setNewAudioLink] = React.useState('');
    const [newVideoLink, setNewVideoLink] = React.useState('');
    const [newReviewLink, setNewReviewLink] = React.useState('');
    const [linksInstructions, setLinkInstructions] = React.useState('Please add a link (must include the ENTIRE url!)');
    const [attendanceInstructions, setAttendanceInstructions] = React.useState('Did you attend this show?');
    const [attendanceRemoveInstructions, setAttendanceRemoveInstructions] = React.useState('You are already marked as ATTENDED. Want to be removed?');

    const {
        loggedIn,
        userInfo
    } = props;

    useEffect(() => {
        // deals with react unmounted component issue
        let mounted = true;

        axios.get('/api/showdetails', {
            params: {
                showNum: id
            }
        })
            .then(res => {
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
    }, [id]);

    const getDetails = () => {
        axios.get('/api/showdetails', {
            params: {
                showNum: id
            }
        })
            .then(res => {
                setShowInfoDetails(res.data[0]);
                setShowInfo(res.data[1]);
                if (res.data[0]) {
                    setSetListArr(res.data[0].setList.songs);
                }
            })
            .catch(err => console.log(err));
    };

    // const handleFlyerSubmit = () => {

    //     const topOfModal = document.getElementById('myModal');
    //     const formData = new FormData();

    //     formData.append('showId', showInfo._id);
    //     formData.append('date', showInfo.date);
    //     formData.append('flyerImg', imageFile);
        
    //     const config = {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     };

    //     axios.post('/api/showflyer', formData, config)
    //         .then(res => {
    //             setFlyerInstructions('THANK YOU! Your submission is AWAITING APPROVAL.');
    //             topOfModal.scrollTop = 0;
    //             setTimeout(() => {
    //                 handleCloseModal('flyer');
    //                 getDetails();
    //             }, 2500);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             setFlyerInstructions(err.response.data.message);
    //             topOfModal.scrollTop = 0;
    //             setImageFile(null);
    //             setImageFileName('')
    //         });
    // };

    const handleFlyerSubmit = async () => {
        const options = {
            maxSizeMB: 1.5
        };

        try {

            const compressedFile = await imageCompression(imageFile, options);

            const formData = new FormData();

            formData.append('showId', showInfo._id);
            formData.append('date', showInfo.date);
            formData.append('flyerImg', compressedFile);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };

            // used to scroll to top of modal
            const topOfModal = document.getElementById('myModal');

            axios.post('/api/showflyer', formData, config)
                .then(res => {
                    setFlyerInstructions('THANK YOU! Your submission is AWAITING APPROVAL.');
                    topOfModal.scrollTop = 0;
                    setTimeout(() => {
                        handleCloseModal('flyer');
                        getDetails();
                    }, 2500);
                })
                .catch(err => {
                    console.log(err);
                    setFlyerInstructions(err.response.data.message);
                    setImageFile(null);
                    setImageFileName('')
                });

        } catch (error) {
            console.log(error);
            if (error.toString() === 'Error: The file given is not an image') {
                setFlyerInstructions('Error: Images Only');
            } else if (error.toString() === 'Error: The file given is not an instance of Blob or File') {
                setFlyerInstructions('Error: No File Selected');
            } else {
                setFlyerInstructions('Oops! Something went wrong. Please try again.');
            }
        }

    };

    const handleSetlistSubmit = () => {
        let newSetlist = [];
        const inputArr = document.getElementsByClassName('modal-setlist-input');

        for (let i = 0; i < inputArr.length; i++) {
            const currentInput = document.getElementById('song' + i);
            if (currentInput.value !== '') {
                newSetlist.push(currentInput.value);
            }
        }

        const setlistData = {
            showId: showInfo._id,
            setlist: newSetlist
        }

        // used to scroll to top of modal
        const topOfModal = document.getElementById('myModal');

        axios.post('/api/setlist', setlistData)
            .then(res => {
                setSetListInstructions('THANK YOU! Your submission is AWAITING APPROVAL.');
                topOfModal.scrollTop = 0;
                setTimeout(() => {
                    handleCloseModal('setlist');
                    getDetails();
                }, 2500);
            })
            .catch(err => {
                console.log(err);
                setSetListInstructions('Oops! Something went wrong!');
                topOfModal.scrollTop = 0;
            });
    };

    const handleLinksSubmit = () => {
        const isValidUrl = (url) => {
            try {
                new URL(url);
            } catch (e) {
                // console.error(e);
                return false;
            }
            return true;
        };

        const isValidForSend = (linkString) => {
            if (isValidUrl(linkString) || linkString === '') {
                return true;
            } else {
                return false;
            }
        };

        const linksData = {
            showId: showInfo._id,
        };

        if (isValidUrl(newAudioLink)) {
            linksData.audio = newAudioLink;
        }

        if (isValidUrl(newVideoLink)) {
            linksData.video = newVideoLink;
        }

        if (isValidUrl(newReviewLink)) {
            linksData.review = newReviewLink;
        }

        if (linksData.audio || linksData.video || linksData.review) {

            // used to scroll to top of modal
            const topOfModal = document.getElementById('myModal');

            if (isValidForSend(newAudioLink) && isValidForSend(newVideoLink) && isValidForSend(newReviewLink)) {
                axios.post('/api/links', linksData)
                    .then(res => {
                        setLinkInstructions('THANK YOU! Your submission is AWAITING APPROVAL.');
                        topOfModal.scrollTop = 0;
                        setTimeout(() => {
                            handleCloseModal('links');
                            getDetails();
                        }, 2500);
                    })
                    .catch(err => console.log(err));

            } else {
                setLinkInstructions('Please enter valid links');
            }

        } else {
            setLinkInstructions('Please enter valid links');
        }

    };

    const handleAttendanceSubmit = () => {
        axios.post('/api/attendance', { showId: showInfo._id, })
            .then(res => {
                setAttendanceInstructions('Thank you!')
                setTimeout(() => {
                    handleCloseModal('attendance');
                    getDetails();
                }, 900);
            })
            .catch(err => console.log(err));
    };

    const handleAttendanceRemoveSubmit = () => {
        axios.put('/api/attendance', { showId: showInfo._id })
            .then(res => {
                setAttendanceRemoveInstructions('Thank you!');
                setTimeout(() => {
                    handleCloseModal('attendance-remove');
                    getDetails();
                }, 900);
            })
            .catch(err => console.log(err));
    }

    const handleCloseModal = (type) => {
        setDisplayModal(false);
        document.body.style.overflowY = 'visible';

        if (type === 'flyer') {
            setImageFileName('');
            setImageFile(null);
            setFlyerInstructions('Please choose a image. (upload may take a moment)');
        } else if (type === 'setlist') {
            setSetListInstructions('Please add songs');
        } else if (type === 'links') {
            setLinkInstructions('Please add a link (must include the ENTIRE url!)');
            setNewAudioLink('');
            setNewVideoLink('');
            setNewReviewLink('');
        } else if (type === 'attendance') {
            setAttendanceInstructions('Did you attend this show?');
        } else if (type === 'attendance-remove') {
            setAttendanceRemoveInstructions('You are already marked as ATTENDED. Want to be removed?')
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
                        userInfo={userInfo}
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
                        newAudioLink={newAudioLink}
                        setNewAudioLink={setNewAudioLink}
                        newVideoLink={newVideoLink}
                        setNewVideoLink={setNewVideoLink}
                        newReviewLink={newReviewLink}
                        setNewReviewLink={setNewReviewLink}
                        handleLinksSubmit={handleLinksSubmit}
                        linksInstructions={linksInstructions}
                        handleAttendanceSubmit={handleAttendanceSubmit}
                        attendanceInstructions={attendanceInstructions}
                        handleAttendanceRemoveSubmit={handleAttendanceRemoveSubmit}
                        attendanceRemoveInstructions={attendanceRemoveInstructions}
                    />}

                </div>
            }
        </div>
    );
};

export default Show;