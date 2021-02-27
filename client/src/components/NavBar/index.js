import React from 'react';
import './style.css';

const NavBar = (props) => {

    return (
        <div className='hamburger-root'>
            <div className='hamburger-div'>
                <div className='test-click' onClick={props.handleDrawerToggle}>

                    <svg id='hamburger' viewBox="0 0 100 75" height="100%" >
                        <rect width="100" height="15"></rect>
                        <rect y="30" width="100" height="15"></rect>
                        <rect y="60" width="100" height="15"></rect>
                    </svg>
                </div>
            </div>
        </div>
    )

};

export default NavBar;