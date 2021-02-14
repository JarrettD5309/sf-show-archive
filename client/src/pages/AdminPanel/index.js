import React from 'react';
import './style.css';
import AdminShowDetails from '../../components/AdminPanelComponents/AdminShowDetails';
import AdminShowInfo from '../../components/AdminPanelComponents/AdminShowInfo';
import AdminSubmissions from '../../components/AdminPanelComponents/AdminSubmissions';
import AdminUserInfo from '../../components/AdminPanelComponents/AdminUserInfo';
import axios from 'axios';

const AdminPanel = () => {
    const [searchShowNum, setSearchShowNum] = React.useState('');
    const [showInfo, setShowInfo] = React.useState({});
    const [showDetails, setShowDetails] = React.useState();

    const handleShowSearch = () => {
        axios.get('/admin/shows', {
            params: {
                showNum: searchShowNum
            }
        })
        .then (res => {
            console.log(res);
            setShowInfo(res.data[1]);
            setShowDetails(res.data[0]);
        })
        .catch( err => console.log(err));
    };
    return (
        <div className='admin-sub-root'>
            <h1>Admin</h1>
            <br />
            <AdminSubmissions />
            <br />
            <AdminShowInfo 
                searchShowNum={searchShowNum}
                setSearchShowNum={setSearchShowNum}
                handleShowSearch={handleShowSearch}
                showInfo={showInfo}
            />
            <br />
            <AdminShowDetails 
                showDetails={showDetails}
            />
            <br />
            <AdminUserInfo />
        </div>
    );
};

export default AdminPanel;