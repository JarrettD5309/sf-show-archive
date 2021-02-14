import React from 'react';
import './style.css';
import AdminShowDetails from '../../components/AdminPanelComponents/AdminShowDetails';
import AdminShowInfo from '../../components/AdminPanelComponents/AdminShowInfo';
import AdminSubmissions from '../../components/AdminPanelComponents/AdminSubmissions';
import AdminUserInfo from '../../components/AdminPanelComponents/AdminUserInfo';
import axios from 'axios';




const AdminPanel = () => {
    return (
        <div className='admin-sub-root'>
            <h1>Admin</h1>
            <br />
            <AdminSubmissions />
            <br />
            <AdminShowInfo />
            <br />
            <AdminShowDetails />
            <br />
            <AdminUserInfo />
        </div>
    );
};

export default AdminPanel;