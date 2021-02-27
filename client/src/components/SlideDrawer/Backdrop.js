import React from 'react';
import './Backdrop.css';

const Backdrop = (props) => {

    return (
        <div
            className={props.show ? 'backdrop open' : 'backdrop'}
            onClick={props.handleBackdrop}
        />
    );

};

export default Backdrop;