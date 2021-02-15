import React from 'react';
import './style.css';
import AdminShowDetails from '../../components/AdminPanelComponents/AdminShowDetails';
import AdminShowInfo from '../../components/AdminPanelComponents/AdminShowInfo';
import AdminSubmissions from '../../components/AdminPanelComponents/AdminSubmissions';
import AdminUserInfo from '../../components/AdminPanelComponents/AdminUserInfo';
import axios from 'axios';
import AdminModal from '../../components/AdminModal';

const AdminPanel = () => {
    const [searchShowNum, setSearchShowNum] = React.useState('');
    const [showInfo, setShowInfo] = React.useState({});
    const [showDetails, setShowDetails] = React.useState();
    const [displayModal, setDisplayModal] = React.useState(false);
    const [modalType, setModalType] = React.useState('');
    const [newShowId, setNewShowId] = React.useState('');
    const [newShowNum, setNewShowNum] = React.useState('');
    const [newShowDate, setNewShowDate] = React.useState('');
    const [newShowVenue, setNewShowVenue] = React.useState('');
    const [newShowAddress, setNewShowAddress] = React.useState('');
    const [newShowCity, setNewShowCity] = React.useState('');
    const [newShowStateCountry, setNewShowStateCountry] = React.useState('');
    const [submitCheck, setSubmitCheck] = React.useState(false);
    const [finalSubmit, setFinalSubmit] = React.useState(false);
    const [checkScreamales, setCheckScreamales] = React.useState('');
    const [updateShowInstructions, setUpdateShowInstructions] = React.useState('This will update the core show database')

    const handleShowSearch = () => {
        axios.get('/admin/shows', {
            params: {
                showNum: searchShowNum
            }
        })
        .then (res => {
            console.log(res);
            setNewShowId(res.data[1]._id);
            setShowInfo(res.data[1]);
            setNewShowNum(res.data[1].showNum);
            setNewShowDate(res.data[1].date);
            setNewShowVenue(res.data[1].venue);
            setNewShowAddress(res.data[1].address);
            setNewShowCity(res.data[1].city);
            setNewShowStateCountry(res.data[1].stateCountry);
            setShowDetails(res.data[0]);
        })
        .catch( err => console.log(err));
    };

    const handleCloseModal = (type) => {
        setDisplayModal(false);
        document.body.style.overflowY = 'visible';
    };

    const handleOpenModal = (type) => {
        setModalType(type);
        setDisplayModal(true);
        document.body.style.overflowY = 'hidden';
    };

    const handleInitialSubmit = () => {
        setFinalSubmit(true);
        setUpdateShowInstructions('ARE YOU SURE?!?!?');
    };

    const handleUpdateShow = () => {
        if (checkScreamales!=='screamales') {
            setUpdateShowInstructions('That does not match');
        } else {
            const updateShowObj = {
                _id: newShowId,
                showNum: newShowNum,
                date: newShowDate,
                venue: newShowVenue,
                address: newShowAddress,
                city: newShowCity,
                stateCountry: newShowStateCountry
            };
            console.log(updateShowObj);
        }
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
                handleOpenModal={handleOpenModal}
            />
            <br />
            <AdminShowDetails 
                showDetails={showDetails}
            />
            <br />
            <AdminUserInfo />
            {displayModal && <AdminModal
                type={modalType}
                handleCloseModal={handleCloseModal}
                newShowNum={newShowNum}
                setNewShowNum={setNewShowNum}
                newShowDate={newShowDate}
                setNewShowDate={setNewShowDate}
                newShowVenue={newShowVenue}
                setNewShowVenue={setNewShowVenue}
                newShowAddress={newShowAddress}
                setNewShowAddress={setNewShowAddress}
                newShowCity={newShowCity}
                setNewShowCity={setNewShowCity}
                newShowStateCountry={newShowStateCountry}
                setNewShowStateCountry={setNewShowStateCountry}
                finalSubmit={finalSubmit}
                handleInitialSubmit={handleInitialSubmit}
                checkScreamales={checkScreamales}
                setCheckScreamales={setCheckScreamales}
                updateShowInstructions={updateShowInstructions}
                handleUpdateShow={handleUpdateShow}
                />
            }
        </div>
    );
};

export default AdminPanel;