import React from 'react';
import './SlideDrawer.css';

const SlideDrawer = (props) => {

    return (
        <div className={props.show ? 'side-drawer open' : 'side-drawer'}>
            <div className='close-x-parent'>
                <div className='close-x-div'>
                    <svg viewBox='0 0 200 200' height="100%" onClick={props.handleBackdrop} className='close-x-svg'>
                        <line x1="30" y1="40" x2="190" y2="160" strokeWidth='8' stroke='black' />
                        <line x1="200" y1="0" x2="0" y2="200" strokeWidth='8' stroke='black' />
                    </svg>
                </div>
            </div>
            <ul className='nav-list'>
                <li className='nav-item'>
                    <a href="#" className='nav-text'>Timeline</a>
                </li>
                <li className='nav-item'>
                    <a href="#" className='nav-text'>Search</a>
                </li>
                <li className='nav-item'>
                    <a href="#" className='nav-text'>Login</a>
                </li>
            </ul>
        </div>
    );
};

export default SlideDrawer;