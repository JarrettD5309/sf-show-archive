import React from 'react';
import './style.css';

const Modal = (props) => {
    const {
        type,
        handleCloseModal,
        handleFlyerSubmit,
        setImageFile,
        imageFileName,
        setImageFileName,
        flyerInstructions,
        setlistInstructions,
        setListArr,
        linksInstructions,
        handleSetlistSubmit,
        newAudioLink,
        setNewAudioLink,
        newVideoLink,
        setNewVideoLink,
        newReviewLink,
        setNewReviewLink,
        handleLinksSubmit,
        attendanceInstructions,
        handleAttendanceSubmit,
        profileInstructions,
        newEmail,
        setNewEmail,
        newInstagram,
        setNewInstagram,
        newTwitter,
        setNewTwitter,
        handleUserUpdate
    } = props;

    const setlistRender = () => {
        let iterations = 0;
        if (setListArr.length < 10) {
            iterations = 15;
        } else {
            iterations = setListArr.length + 5
        }

        let setlistInputs = [];

        for (let i = 0; i < iterations; i++) {
            setlistInputs.push(
                <div key={i}>
                    <label htmlFor='song' className='modal-setlist-label'>{i + 1}. </label>
                    <input
                        type='text'
                        id={'song' + i}
                        className='modal-setlist-input'
                        name={'song' + i}
                        defaultValue={setListArr[i] ? setListArr[i] : ''}
                    />
                </div>
            );
        }

        return setlistInputs;
    };

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">

                {type === 'flyer' &&
                    <div>
                        <h2>Add Flyer</h2>
                        <p className='modal-instructions'>{flyerInstructions}</p>
                        <div className='modal-file-div'>
                            <div className='modal-file-text-area'>
                                {/* eslint-disable-next-line */}
                                {imageFileName.replace(/.*[\/\\]/, '')}
                            </div>
                            <label htmlFor='flyer-image' className='modal-file-label'>
                                Choose File
                            <input
                                    type='file'
                                    id='flyer-image'
                                    name='flyer-image'
                                    value={imageFileName}
                                    onChange={event => {
                                        setImageFile(event.target.files[0]);
                                        setImageFileName(event.target.value);
                                    }}
                                    className='modal-input-file'
                                />
                            </label><br />
                            <br />

                        </div>
                        <div className='modal-button-div'>
                            <button className='modal-close-button' type='button' onClick={() => handleCloseModal(type)}>Close</button>
                            <button className='modal-submit-button' type='button' onClick={handleFlyerSubmit}>Submit</button>
                        </div>
                    </div>
                }

                {type === 'setlist' &&
                    <div>
                        <h2>Setlist</h2>
                        <p className='modal-instructions'>{setlistInstructions}</p>
                        {setlistRender()}

                        <div className='modal-button-div'>
                            <button className='modal-close-button' type='button' onClick={() => handleCloseModal(type)}>Close</button>
                            <button className='modal-submit-button' type='button' onClick={handleSetlistSubmit}>Submit</button>
                        </div>
                    </div>
                }

                {type === 'links' &&
                    <div>
                        <h2>Links</h2>
                        <p className='modal-instructions'>{linksInstructions}</p>
                        <label htmlFor='audio' className='modal-links-label'><h4>Audio</h4></label>
                        <input
                            type='text'
                            id='audio'
                            className='modal-links-input'
                            name='audio'
                            value={newAudioLink}
                            onChange={event => setNewAudioLink(event.target.value)}
                        />
                        <label htmlFor='video' className='modal-links-label'><h4>Video</h4></label>
                        <input
                            type='text'
                            id='video'
                            className='modal-links-input'
                            name='video'
                            value={newVideoLink}
                            onChange={event => setNewVideoLink(event.target.value)}
                        />
                        <label htmlFor='review' className='modal-links-label'><h4>Review</h4></label>
                        <input
                            type='text'
                            id='review'
                            className='modal-links-input'
                            name='review'
                            value={newReviewLink}
                            onChange={event => setNewReviewLink(event.target.value)}
                        />

                        <div className='modal-button-div'>
                            <button className='modal-close-button' type='button' onClick={() => handleCloseModal(type)}>Close</button>
                            <button className='modal-submit-button' type='button' onClick={handleLinksSubmit}>Submit</button>
                        </div>
                    </div>
                }

                {type === 'attendance' &&
                    <div>
                        <h2>Attendance</h2>
                        <p className='modal-instructions'>{attendanceInstructions}</p>

                        <div className='modal-button-div'>
                            <button className='modal-close-button' type='button' onClick={() => handleCloseModal(type)}>Close</button>
                            <button className='modal-submit-button' type='button' onClick={handleAttendanceSubmit}>Yes</button>
                        </div>
                    </div>
                }

                {type === 'profile' &&
                    <div>
                        <h2>Profile</h2>
                        <p className='modal-instructions'>{profileInstructions}</p>
                        <label htmlFor='profile-email' className='modal-links-label'><h4>Email</h4></label>
                        <input
                            type='text'
                            id='profile-email'
                            className='modal-links-input'
                            name='profile-email'
                            value={newEmail}
                            onChange={event => setNewEmail(event.target.value)}
                        />
                        <label htmlFor='profile-twitter' className='modal-links-label'><h4>Twitter</h4></label>
                        <input
                            type='text'
                            id='profile-twitter'
                            className='modal-links-input'
                            name='profile-twitter'
                            value={newTwitter}
                            onChange={event => setNewTwitter(event.target.value)}
                        />
                        <label htmlFor='profile-instagram' className='modal-links-label'><h4>Instagram</h4></label>
                        <input
                            type='text'
                            id='profile-instagram'
                            className='modal-links-input'
                            name='profile-instagram'
                            value={newInstagram}
                            onChange={event => setNewInstagram(event.target.value)}
                        />

                        <div className='modal-button-div'>
                            <button className='modal-close-button' type='button' onClick={() => handleCloseModal(type)}>Close</button>
                            <button className='modal-submit-button' type='button' onClick={handleUserUpdate}>Submit</button>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default Modal;