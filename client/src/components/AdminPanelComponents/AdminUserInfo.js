import React from 'react';
import './style.css';

const AdminUserInfo = (props) => {
    const {
        handleUserSearch,
        usernameSearch,
        setUsernameSearch,
        handleOpenModal
    } = props;

    let _id = '';
    let twitter = '';
    let instagram = '';
    let username = '';
    let email = '';
    let banned = '';
    
    if (props.userSearchInfo) {
        _id = props.userSearchInfo._id;
        twitter = props.userSearchInfo.twitter;
        instagram = props.userSearchInfo.instagram;
        username = props.userSearchInfo.username;
        email = props.userSearchInfo.email;
        banned = props.userSearchInfo.banned ? 'true' : 'false';
    }
    return (
        <div className='admin-user-info-div'>
            <h2 className='admin-margin-bottom'>User Info</h2>
            <div className='admin-margin-bottom'>
                <label htmlFor='admin-username-search'>Username</label><br />
                <input 
                    type='text'
                    id='admin-username-search'
                    name='admin-username-search'
                    value={usernameSearch}
                    onChange={event => setUsernameSearch(event.target.value)}
                /><br />
                <button type='button' onClick={handleUserSearch}>Search</button>
            </div>
            <p className='admin-margin-bottom'><span className='slight-bold'>ID:</span> {_id}</p>
            <p className='admin-margin-bottom'><span className='slight-bold'>username:</span> <a href={`/user/${username}`}>{username}</a></p>
            <p className='admin-margin-bottom'><span className='slight-bold'>email:</span> {email}</p>
            <p className='admin-margin-bottom'><span className='slight-bold'>twitter:</span> {twitter}</p>
            <p className='admin-margin-bottom'><span className='slight-bold'>instagram:</span> {instagram}</p>
            <p className='admin-margin-bottom'><span className='slight-bold'>banned:</span> {banned}</p>
            {props.userSearchInfo?.banned ? 
            <button type='button' onClick={()=>handleOpenModal('unban-user')}>Unban User</button>
            : 
            <button type='button' onClick={()=>handleOpenModal('ban-user')}>Ban User</button>
            }
        </div>
    );
};

export default AdminUserInfo;