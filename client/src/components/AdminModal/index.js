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
        finalDelete
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
            </div>
        </div>
    );
};

export default AdminModal;