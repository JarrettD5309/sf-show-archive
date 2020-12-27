import React from 'react';
import './SlideDrawer.css';

const SlideDrawer = (props) => {

    return (
        <div className={props.show ? 'side-drawer open' : 'side-drawer'}>
            <p>HELLO WORLD</p>
        </div>
    );
};

export default SlideDrawer;