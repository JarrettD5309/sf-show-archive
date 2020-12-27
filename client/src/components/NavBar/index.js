import React from 'react';
import './style.css';

const NavBar = (props) => {

    return (
        <div className='hamburger-root'>
            <div className='hamburger'>
                <svg viewBox="0 0 100 80" height="100%" onClick={props.handleDrawerToggle}>
                    <rect width="100" height="20"></rect>
                    <rect y="30" width="100" height="20"></rect>
                    <rect y="60" width="100" height="20"></rect>
                </svg>
            </div>
        </div>
    )

};

export default NavBar;