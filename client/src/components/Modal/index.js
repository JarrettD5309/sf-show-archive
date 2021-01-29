import React from 'react';
import './style.css';

const Modal = (props) => {
    const { 
        type, 
        handleCloseModal, 
        handleFlyerSubmit,
        setImageFile,
        imageFileName,
        setImageFileName 
    } = props;
    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                {/* <span className="close" onClick={() => setDisplayModal(false)}>&times;</span> */}
                {type === 'flyer' &&
                <div>
                    <h2>Add Flyer</h2>
                    <p className='modal-instructions'>Please choose a image</p>
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

            </div>
        </div>
    );
};

export default Modal;