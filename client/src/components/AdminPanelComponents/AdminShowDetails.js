import React from 'react';
import './style.css';

const AdminShowDetails = (props) => {
    let showID = '';
    let showNum = '';
    let _id = '';
    let attendance = [];
    let audio = [];
    let review = [];
    let video = [];
    let setList = {};
    let flyer = [];
    if (props.showDetails) {
        showID = props.showDetails.showId._id;
        showNum = props.showDetails.showId.showNum;
        _id = props.showDetails._id;
        attendance = props.showDetails.attendance;
        audio = props.showDetails.audio;
        review = props.showDetails.review;
        video = props.showDetails.video;
        setList = props.showDetails.setList;
        flyer = props.showDetails.flyer
    }

    const {
        handleOpenModal,
        handleRemoveDetail
    } = props;

    return (
        <div className='admin-show-details-div'>
            <h2 className='admin-margin-bottom'>Show Details</h2>
            <p className='admin-margin-bottom'><span className='slight-bold'>ID:</span> {_id} </p>
            <p className='admin-margin-bottom'><span className='slight-bold'>showID:</span> {showID}</p>
            <p className='admin-margin-bottom'><span className='slight-bold'>showNum:</span> {showNum}</p>
            <p className='admin-margin-bottom'><span className='slight-bold'>attendance: </span>
                {attendance.map(user => `${user.username} (${user._id}), `)}
            </p>
            <button type='button' className='admin-margin-bottom' onClick={()=>handleOpenModal('attendance')}>Edit Attendance</button>
            <p className='slight-bold admin-margin-bottom'>audio: </p>
            {audio.map((audio, i) =>
            (
                <div key={i}>
                    <a href={audio.link} target='_blank' rel="noopener noreferrer">{audio.link}</a><br />
                    <p>{`${audio.contributed.username} (${audio.contributed._id})`}</p>
                    <button type='button' onClick={()=>handleRemoveDetail('audio',audio._id,showID)}>Delete</button>
                    <br />
                    <br />
                </div>
            )
            )}
            <p className='slight-bold admin-margin-bottom'>review: </p>
            {review.map((review, i) =>
            (
                <div key={i}>
                    <a href={review.link} target='_blank' rel="noopener noreferrer">{review.link}</a><br />
                    <p>{`${review.contributed.username} (${review.contributed._id})`}</p>
                    <button type='button' onClick={()=>handleRemoveDetail('review',review._id,showID)}>Delete</button>
                    <br />
                    <br />
                </div>
            )
            )}
            <p className='slight-bold admin-margin-bottom'>video: </p>
            {video.map((video, i) =>
            (
                <div key={i}>
                    <a href={video.link} target='_blank' rel="noopener noreferrer">{video.link}</a><br />
                    <p>{`${video.contributed.username} (${video.contributed._id})`}</p>
                    <button type='button' onClick={()=>handleRemoveDetail('video',video._id,showID)}>Delete</button>
                    <br />
                    <br />
                </div>
            )
            )}

            <p className='slight-bold admin-margin-bottom'>setList: </p>
            {setList.contributed &&
                <div>
                    {setList.songs.map((song, i) =>
                        <p key={i}>{i + 1}. {song}</p>
                    )}
                    <p>{setList.contributed.username} ({setList.contributed._id})</p><br />
                </div>
            }
            <button type='button' className='admin-margin-bottom' onClick={()=>handleOpenModal('setlist')}>Edit Setlist</button>
            <p className='slight-bold admin-margin-bottom'>flyer: </p>
            {flyer.map(eachFlyer => {
                const imgName = eachFlyer.flyerImg;
                const username = eachFlyer.contributed.username;
                const flyerUserId = eachFlyer.contributed._id;
                return (
                    <div key={eachFlyer._id}>
                        <img src={process.env.PUBLIC_URL + `/uploads/${imgName}`} className='admin-flyer' alt={`Flyer`} key={eachFlyer._id} />
                        <p>{username} ({flyerUserId})</p>
                        <button type='button' onClick={()=>handleRemoveDetail('flyer',eachFlyer._id,showID,imgName)}>Delete</button>
                    </div>
                )
            }
            )

            }
        </div>
    );
};

export default AdminShowDetails;