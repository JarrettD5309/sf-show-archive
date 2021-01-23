import React from 'react';
import './SlideDrawer.css';
import axios from 'axios';

const SlideDrawer = (props) => {

    const handleLogout = () => {
        axios.get('/api/logout')
            .then(res=>{
                console.log(res);
                if (res.status === 200) {
                    props.setLoggedIn(false);
                    props.setDrawerOpen(false);
                }
            })
            .catch(err=>console.log(err));
    };

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
                    <a href="/" className='nav-text'>Timeline</a>
                </li>
                <li className='nav-item'>
                    <a href="/search" className='nav-text'>Search</a>
                </li>
                {props.loggedIn ?
                    (
                        <li className='nav-item'>
                            <p className='nav-text' onClick={handleLogout} >Logout</p>
                        </li>
                    )
                    :
                    (
                        <li className='nav-item'>
                            <a href="/login" className='nav-text'>Login</a>
                        </li>
                    )

                }

            </ul>
        </div>
    );
};

export default SlideDrawer;