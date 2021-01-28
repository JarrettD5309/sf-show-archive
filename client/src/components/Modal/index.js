import React from 'react';
import './style.css';

const Modal = (props) => {
    const { setDisplayModal, type } = props;
    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => setDisplayModal(false)}>&times;</span>
                {type === 'flyer' &&
                <div>
                    <div>
                        <label htmlFor='flyer-image'>Flyer Image</label><br />
                        <input
                            type='file'
                            id='flyer-image'
                            name='flyer-image'
                            // value={imageFile}
                            onChange={event => props.setImageFile(event.target.files[0])}
                        // className='login-input' 
                        /><br />
        
                    </div>
                    <div>
                        <button className='login-button' type='button' onClick={props.handleFlyerSubmit}>Submit</button>
                    </div>
                </div>
                }

            </div>
        </div>
    );
};

export default Modal;