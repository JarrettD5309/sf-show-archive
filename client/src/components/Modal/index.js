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
        handleSetlistSubmit
    } = props;

    // const [numSetlistInputs, setNumSetlistInputs] = React.useState(0);

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
                    <label htmlFor='song'>{i + 1}. </label>
                    <input
                        type='text'
                        id={'song' + i}
                        className='modal-setlist-input'
                        name={'song' + i}
                        defaultValue=''
                    />
                </div>
            );
        }

        // setNumSetlistInputs(iterations);
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
                        <h2>Add Setlist</h2>
                        <p className='modal-instructions'>{setlistInstructions}</p>
                        {setlistRender()}
                        {/* <label htmlFor='song'>1. </label>
                        <input
                            type='text'
                            id='song'
                            name='song'
                        // value={venue} 
                        // onChange={event => setVenue(event.target.value)} 
                        /> */}

                        <div className='modal-button-div'>
                            <button className='modal-close-button' type='button' onClick={() => handleCloseModal(type)}>Close</button>
                            <button className='modal-submit-button' type='button' onClick={handleSetlistSubmit}>Submit</button>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default Modal;