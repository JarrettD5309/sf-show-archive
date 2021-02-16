import React from 'react';
import './style.css';

const AdminAddShow = (props) => {
    const {
        handleOpenModal
    } = props;

        return (
            <div>
                <h2 className='admin-margin-bottom'>Add Show</h2>
                <button type='button' onClick={()=>handleOpenModal('addShow')}>Add Show</button>
            </div>
        );
};

export default AdminAddShow;