import React, { useEffect } from 'react';
import ProfileDisplay from '../../components/ProfileDisplay';
import dateFunction from '../../other/dateFunction';
import Modal from '../../components/Modal';
import axios from 'axios';

const Profile = (props) => {

    const [attendedArray, setAttendedArray] = React.useState([]);
    const [contributedArray, setContributedArray] = React.useState([]);
    const [displayModal, setDisplayModal] = React.useState(false);
    const [modalType, setModalType] = React.useState('');
    const [newEmail, setNewEmail] = React.useState('');
    const [newInstagram, setNewInstagram] = React.useState('');
    const [newTwitter, setNewTwitter] = React.useState('');
    const [profileInstructions, setProfileInstructions] = React.useState('Please edit your profile (must include the ENTIRE url!)');

    const {
        email,
        username,
        _id,
        instagram,
        twitter
    } = props.userInfo;

    const {
        getUserInfo
    } = props;

    useEffect(() => {
        setNewEmail(props.userInfo.email);
        setNewInstagram(props.userInfo.instagram);
        setNewTwitter(props.userInfo.twitter);

        const getShowsAttended = () => {
            axios.get('/api/userattendance', {
                params: {
                    userID: _id
                }
            })
                .then(res => {
                    const attendedDates = res.data[0].map(show => {
                        const dateString = dateFunction(show.showId.date, true);
                        return {
                            dateString: dateString,
                            showNum: parseInt(show.showId.showNum)
                        };
                    });
                    attendedDates.sort((a, b) => a.showNum - b.showNum);
                    setAttendedArray(attendedDates);

                    const contributedDates = res.data[1].map(show => {
                        const dateString = dateFunction(show.showId.date, true);
                        return {
                            dateString: dateString,
                            showNum: parseInt(show.showId.showNum)
                        };
                    });
                    contributedDates.sort((a, b) => a.showNum - b.showNum);
                    setContributedArray(contributedDates);
                })
                .catch(err => {
                    console.log(err);
                })
        };

        getShowsAttended();
    }, []);

    const handleUserUpdate = () => {
        const userUpdate = {
            email: newEmail,
            instagram: newInstagram,
            twitter: newTwitter
        }

        axios.put('/api/userupdate', userUpdate)
            .then(res => {
                setProfileInstructions('Success!');
                setTimeout(() => {
                    handleCloseModal('profile');
                    getUserInfo();
                }, 900);
            })
            .catch(err => {
                console.log(err);
                setProfileInstructions(err.response.data);
            });

    };

    const handleCloseModal = (type) => {
        setDisplayModal(false);
        setProfileInstructions('Please edit your profile (must include the ENTIRE url!)');
        setNewEmail(props.userInfo.email);
        setNewInstagram(props.userInfo.instagram);
        setNewTwitter(props.userInfo.twitter);
        document.body.style.overflowY = 'visible';

    };

    const handleOpenModal = (type) => {
        setModalType(type);
        setDisplayModal(true);
        document.body.style.overflowY = 'hidden';
    };

    return (
        <div>

            <ProfileDisplay
                username={username}
                email={email}
                instagram={instagram}
                twitter={twitter}
                contributedArray={contributedArray}
                attendedArray={attendedArray}
                handleOpenModal={handleOpenModal}
            />

            {displayModal && <Modal
                type={modalType}
                handleCloseModal={handleCloseModal}
                profileInstructions={profileInstructions}
                newEmail={newEmail}
                setNewEmail={setNewEmail}
                newInstagram={newInstagram}
                setNewInstagram={setNewInstagram}
                newTwitter={newTwitter}
                setNewTwitter={setNewTwitter}
                handleUserUpdate={handleUserUpdate}
            />}
        </div>
    );

};

export default Profile;