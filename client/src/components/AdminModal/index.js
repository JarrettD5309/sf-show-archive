import React from 'react';
// import './style.css';

const AdminModal = (props) => {
    const {
        type,
        handleCloseModal,
        newShowNum,
        setNewShowNum,
        newShowDate,
        setNewShowDate,
        newShowVenue,
        setNewShowVenue,
        newShowAddress,
        setNewShowAddress,
        newShowCity,
        setNewShowCity,
        newShowStateCountry,
        setNewShowStateCountry,
        finalSubmit,
        handleInitialSubmit,
        checkScreamales,
        setCheckScreamales,
        updateShowInstructions,
        handleUpdateShow,
        addShowInstructions,
        addShowNum,
        setAddShowNum,
        addShowDate,
        setAddShowDate,
        addShowVenue,
        setAddShowVenue,
        addShowAddress,
        setAddShowAddress,
        addShowCity,
        setAddShowCity,
        addShowStateCountry,
        setAddShowStateCountry,
        handleAddShow,
        handleInitialDelete,
        handleDeleteShow,
        checkDeleteShow,
        setCheckDeleteShow,
        finalDelete,
        banUserInstructions,
        userSearchUsername,
        checkBanUser,
        setCheckBanUser,
        handleBanUser,
        unbanUserInstructions,
        handleUnbanUser,
        attendanceInstructions,
        showDetails,
        handleRemoveUserAttendance,
        setlistInstructions,
        handleSetlistSubmit,
        submissionInstructions,
        submissionIndex,
        submissions,
        handleSubmission
    } = props;
    return (
        <div id='myModal' className='modal'>
            <div className='modal-content'>
                {type === 'showInfo' &&
                    <div>
                        <h2>Show Info</h2><br />
                        <p>{updateShowInstructions}</p><br />
                        <label htmlFor='admin-new-show-num'>ShowNum</label><br />
                        <input
                            type='text'
                            id='admin-new-show-num'
                            name='admin-new-show-num'
                            value={newShowNum}
                            onChange={event => setNewShowNum(event.target.value)}
                        /><br /><br />
                        <label htmlFor='admin-new-show-date'>Date (YYYY-MM-DD)</label><br />
                        <input
                            type='text'
                            id='admin-new-show-date'
                            name='admin-new-show-date'
                            value={newShowDate}
                            onChange={event => setNewShowDate(event.target.value)}
                        /><br /><br />
                        <label htmlFor='admin-new-show-venue'>Venue</label><br />
                        <input
                            type='text'
                            id='admin-new-show-venue'
                            name='admin-new-show-venue'
                            value={newShowVenue}
                            onChange={event => setNewShowVenue(event.target.value)}
                        /><br /><br />
                        <label htmlFor='admin-new-show-address'>Address</label><br />
                        <input
                            type='text'
                            id='admin-new-show-address'
                            name='admin-new-show-address'
                            value={newShowAddress}
                            onChange={event => setNewShowAddress(event.target.value)}
                        /><br /><br />
                        <label htmlFor='admin-new-show-city'>City</label><br />
                        <input
                            type='text'
                            id='admin-new-show-city'
                            name='admin-new-show-city'
                            value={newShowCity}
                            onChange={event => setNewShowCity(event.target.value)}
                        /><br /><br />
                        <label htmlFor='admin-new-show-state-country'>State/Country (2 uppercase letters)</label><br />
                        <input
                            type='text'
                            id='admin-new-show-state-country'
                            name='admin-new-show-state-country'
                            value={newShowStateCountry}
                            onChange={event => setNewShowStateCountry(event.target.value)}
                        /><br /><br />
                        {finalSubmit &&
                            <div>
                                <label htmlFor='admin-check-screamales'>Type in screamales</label><br />
                                <input
                                    type='text'
                                    id='admin-check-screamales'
                                    name='admin-check-screamales'
                                    value={checkScreamales}
                                    onChange={event => setCheckScreamales(event.target.value)}
                                /><br /><br />
                            </div>
                        }
                        {finalDelete &&
                            <div>
                                <label htmlFor='admin-check-delete-this-show'>Type in delete this show</label><br />
                                <input
                                    type='text'
                                    id='admin-check-delete-this-show'
                                    name='admin-check-delete-this-show'
                                    value={checkDeleteShow}
                                    onChange={event => setCheckDeleteShow(event.target.value)}
                                /><br /><br />
                            </div>
                        }
                        <button
                            type='button'
                            onClick={() => handleCloseModal(type)}
                        >
                            Close
                        </button>
                        {!finalSubmit && !finalDelete &&
                            <button
                                type='button'
                                onClick={handleInitialSubmit}
                            >
                                Submit
                            </button>
                        }
                        {!finalDelete && !finalSubmit &&
                            <button
                                type='button'
                                onClick={handleInitialDelete}
                            >
                                Delete
                            </button>
                        }
                        {finalSubmit &&
                            <button
                                type='button'
                                onClick={handleUpdateShow}
                            >
                                Final Update
                            </button>
                        }
                        {finalDelete &&
                            <button
                                type='button'
                                onClick={handleDeleteShow}
                            >
                                Final Delete
                            </button>
                        }
                    </div>
                }

                {type === 'addShow' &&
                    <div>
                        <h2>Add Show</h2><br />
                        <p>{addShowInstructions}</p><br />
                        <label htmlFor='admin-new-show-num'>ShowNum</label><br />
                        <input
                            type='text'
                            id='admin-new-show-num'
                            name='admin-new-show-num'
                            value={addShowNum}
                            onChange={event => setAddShowNum(event.target.value)}
                        /><br /><br />
                        <label htmlFor='admin-new-show-date'>Date (YYYY-MM-DD)</label><br />
                        <input
                            type='text'
                            id='admin-new-show-date'
                            name='admin-new-show-date'
                            value={addShowDate}
                            onChange={event => setAddShowDate(event.target.value)}
                        /><br /><br />
                        <label htmlFor='admin-new-show-venue'>Venue</label><br />
                        <input
                            type='text'
                            id='admin-new-show-venue'
                            name='admin-new-show-venue'
                            value={addShowVenue}
                            onChange={event => setAddShowVenue(event.target.value)}
                        /><br /><br />
                        <label htmlFor='admin-new-show-address'>Address</label><br />
                        <input
                            type='text'
                            id='admin-new-show-address'
                            name='admin-new-show-address'
                            value={addShowAddress}
                            onChange={event => setAddShowAddress(event.target.value)}
                        /><br /><br />
                        <label htmlFor='admin-new-show-city'>City</label><br />
                        <input
                            type='text'
                            id='admin-new-show-city'
                            name='admin-new-show-city'
                            value={addShowCity}
                            onChange={event => setAddShowCity(event.target.value)}
                        /><br /><br />
                        <label htmlFor='admin-new-show-state-country'>State/Country (2 uppercase letters)</label><br />
                        <input
                            type='text'
                            id='admin-new-show-state-country'
                            name='admin-new-show-state-country'
                            value={addShowStateCountry}
                            onChange={event => setAddShowStateCountry(event.target.value)}
                        /><br /><br />
                        {finalSubmit &&
                            <div>
                                <label htmlFor='admin-check-screamales'>Type in screamales</label><br />
                                <input
                                    type='text'
                                    id='admin-check-screamales'
                                    name='admin-check-screamales'
                                    value={checkScreamales}
                                    onChange={event => setCheckScreamales(event.target.value)}
                                /><br /><br />
                            </div>
                        }
                        <button
                            type='button'
                            onClick={() => handleCloseModal(type)}
                        >
                            Close
                        </button>
                        <button
                            type='button'
                            onClick={handleAddShow}
                        >
                            Submit
                        </button>
                    </div>
                }

                {type === 'ban-user' &&
                    <div>
                        <h2>Ban User</h2><br />
                        <p>{banUserInstructions}</p><br />
                        <p className='slight-bold'>{userSearchUsername}</p><br />
                        <div>
                            <label htmlFor='admin-check-ban-user'>Type in ban this user</label><br />
                            <input
                                type='text'
                                id='admin-check-ban-user'
                                name='admin-check-ban-user'
                                value={checkBanUser}
                                onChange={event => setCheckBanUser(event.target.value)}
                            /><br /><br />
                        </div>
                        <button
                            type='button'
                            onClick={() => handleCloseModal(type)}
                        >
                            Close
                        </button>
                        <button
                            type='button'
                            onClick={handleBanUser}
                        >
                            Submit
                        </button>
                    </div>
                }

                {type === 'unban-user' &&
                    <div>
                        <h2>Unban User</h2><br />
                        <p>{unbanUserInstructions}</p><br />
                        <p className='slight-bold'>{userSearchUsername}</p><br />
                        <button
                            type='button'
                            onClick={() => handleCloseModal(type)}
                        >
                            Close
                        </button>
                        <button
                            type='button'
                            onClick={handleUnbanUser}
                        >
                            Submit
                        </button>
                    </div>
                }

                {type === 'attendance' &&
                    <div>
                        <h2>Attendance</h2><br />
                        <p>{attendanceInstructions}</p><br />
                        {showDetails ?
                            showDetails.attendance.map(user => (
                                <div key={user._id}>
                                    <p>{user.username} ({user._id}) </p>
                                    <button type='button' className='admin-margin-bottom' onClick={() => handleRemoveUserAttendance(user._id, showDetails.showId._id)}>Remove</button>
                                </div>
                            ))
                            :
                            <p>No details</p>
                        }
                        <br />
                        <button
                            type='button'
                            onClick={() => handleCloseModal(type)}
                        >
                            Close
                        </button>
                    </div>
                }

                {type === 'setlist' &&
                    <div>
                        <h2>Setlist</h2><br />
                        <p>{setlistInstructions}</p><br />
                        {showDetails ?
                            showDetails.setList.songs.map((song, i) => (
                                <div key={i}>
                                    <label htmlFor='song' className='modal-setlist-label'>{i + 1}. </label>
                                    <input
                                        type='text'
                                        id={'admin-song' + i}
                                        className='admin-modal-setlist-input'
                                        name={'admin-song' + i}
                                        defaultValue={song}
                                    />
                                </div>
                            ))
                            :
                            <p>No details</p>
                        }
                        <br />
                        <button
                            type='button'
                            onClick={() => handleCloseModal(type)}
                        >
                            Close
                        </button>
                        <button
                            type='button'
                            onClick={() => handleSetlistSubmit(showDetails.showId._id)}
                        >
                            Submit
                        </button>
                    </div>
                }

                {type === 'submission' &&
                    <div>
                        <h2>New Submission</h2><br />
                        <p>{submissionInstructions}</p><br />
                        <p className='admin-margin-bottom'><span className='slight-bold'>Date:</span> <a href={`/show/${submissions[submissionIndex].showId.showNum}`} target='_blank' rel="noopener noreferrer">{submissions[submissionIndex].showId.date}</a></p>
                        <p className='slight-bold admin-margin-bottom'>setList: </p>
                        {submissions[submissionIndex].setList.songs.length > 0 &&
                            <div>
                                {submissions[submissionIndex].setList.songs.map((song, i) =>
                                    <p key={i}>{i + 1}. {song}</p>
                                )}
                                <p>{submissions[submissionIndex].setList.contributed.username} ({submissions[submissionIndex].setList.contributed._id})</p><br />
                            </div>
                        }
                        <br />
                        <p className='slight-bold admin-margin-bottom'>audio: </p>
                        {submissions[submissionIndex].audio &&
                            <div >
                                <a href={submissions[submissionIndex].audio.link} target='_blank' rel="noopener noreferrer">{submissions[submissionIndex].audio.link}</a><br />
                                <p>{`${submissions[submissionIndex].audio.contributed.username} (${submissions[submissionIndex].audio.contributed._id})`}</p>
                            </div>
                        }
                        <br />
                        <p className='slight-bold admin-margin-bottom'>video: </p>
                        {submissions[submissionIndex].video &&
                            <div >
                                <a href={submissions[submissionIndex].video.link} target='_blank' rel="noopener noreferrer">{submissions[submissionIndex].video.link}</a><br />
                                <p>{`${submissions[submissionIndex].video.contributed.username} (${submissions[submissionIndex].video.contributed._id})`}</p>
                            </div>
                        }
                        <br />
                        <p className='slight-bold admin-margin-bottom'>review: </p>
                        {submissions[submissionIndex].review &&
                            <div>
                                <a href={submissions[submissionIndex].review.link} target='_blank' rel="noopener noreferrer">{submissions[submissionIndex].review.link}</a><br />
                                <p>{`${submissions[submissionIndex].review.contributed.username} (${submissions[submissionIndex].review.contributed._id})`}</p>
                            </div>
                        }
                        <br />
                        <p className='slight-bold admin-margin-bottom'>flyer: </p>
                        {submissions[submissionIndex].flyer && 
                            <div>
                                <img src={process.env.PUBLIC_URL + `/uploads/${submissions[submissionIndex].flyer.flyerImg}`} className='admin-flyer' alt='flyer' />
                                <p>{`${submissions[submissionIndex].flyer.contributed.username} (${submissions[submissionIndex].flyer.contributed._id})`}</p>
                            </div>
                        }
                        <br />
                        <button
                            type='button'
                            onClick={() => handleCloseModal(type)}
                        >
                            Close
                        </button>
                        <button
                            type='button'
                            onClick={() => handleSubmission('reject', submissions[submissionIndex]._id)}
                        >
                            Reject
                        </button>
                        <button
                            type='button'
                            onClick={() => handleSubmission('approve', submissions[submissionIndex]._id)}
                        >
                            Approve
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default AdminModal;