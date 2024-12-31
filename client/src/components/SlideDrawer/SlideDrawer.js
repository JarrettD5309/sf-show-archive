import React from 'react';
import './SlideDrawer.css';
import { useNavigate } from "react-router";
import axios from 'axios';

const SlideDrawer = (props) => {
    let navigate = useNavigate();
    const handleLogout = () => {
        axios.get('/api/logout')
            .then(res => {
                if (res.status === 200) {
                    props.setLoggedIn(false);
                    props.setDrawerOpen(false);
                    props.setIsAdmin(false);
                    navigate('/');
                }
            })
            .catch(err => console.log(err));
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
                <li className='nav-item'>
                    <a href="/latest-updates" className='nav-text'>Updates</a>
                </li>
                {props.loggedIn ?
                    (
                        <div>
                            <li className='nav-item'>
                                <a href="/profile" className='nav-text'>Profile</a>
                            </li>
                            <li className='nav-item'>
                                <p className='nav-text' onClick={handleLogout} >Logout</p>
                            </li>
                        </div>
                    )
                    :
                    (
                        <li className='nav-item'>
                            <a href="/login" className='nav-text'>Login</a>
                        </li>
                    )

                }

                {props.isAdmin &&
                    <li className='nav-item'>
                        <a href="/admin-panel" className='nav-text'>AdminPanel</a>
                    </li>
                }

            </ul>
        </div>
    );
};

export default SlideDrawer;