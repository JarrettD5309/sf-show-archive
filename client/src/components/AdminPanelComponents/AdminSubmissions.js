import React from 'react';
import './style.css';

const AdminSubmissions = (props) => {
    const {
        submissions,
        handleOpenModal
    } = props;
    return (
        <div>
            <h2 className='admin-margin-bottom'>New Submissions</h2>
            <p><span className='slight-bold'>New Submission List: </span>
                {submissions.map((submission, i) => (
                    <span className='admin-clickable' key={submission._id} onClick={() => handleOpenModal('submission', i)}>{submission.showId.date}, </span>
                ))}
            </p>
        </div>
    );
};

export default AdminSubmissions;