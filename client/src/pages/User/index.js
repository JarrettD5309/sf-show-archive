import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserDisplay from '../../components/UserDisplay';
import dateFunction from '../../other/dateFunction';
import axios from 'axios';

const User = () => {
    const { username } = useParams();
    const [userInfo, setUserInfo] = React.useState();
    const [attendedArray, setAttendedArray] = React.useState([]);
    const [contributedArray, setContributedArray] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    useEffect(() => {
        axios.get('/api/publicuser', {
            params: {
                username: username
            }
        })
            .then(res => {
                setUserInfo(res.data[0][0]);

                const attendedDates = res.data[1].map(show => {
                    const dateString = dateFunction(show.showId.date, true);
                    return {
                        dateString: dateString,
                        showNum: parseInt(show.showId.showNum)
                    };
                });
                attendedDates.sort((a, b) => a.showNum - b.showNum);
                setAttendedArray(attendedDates);

                const contributedDates = res.data[2].map(show => {
                    const dateString = dateFunction(show.showId.date, true);
                    return {
                        dateString: dateString,
                        showNum: parseInt(show.showId.showNum)
                    };
                });
                contributedDates.sort((a, b) => a.showNum - b.showNum);
                setContributedArray(contributedDates);
            })
            .catch(err => console.log(err))
            .then(() => setLoading(false));
    }, [])

    const renderUserDisplay = () => {
        if (loading) {
            return null
        } else if (userInfo) {
            return <UserDisplay
                userInfo={userInfo}
                attendedArray={attendedArray}
                contributedArray={contributedArray}
            />
        } else {
            return <h1 style={{ textAlign: 'center' }} >404 NOT FOUND</h1>
        }
    }

    return (
        <div>
            {renderUserDisplay()}
        </div>
    );

};

export default User;