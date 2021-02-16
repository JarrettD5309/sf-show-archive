import React from 'react';
import './style.css';
import AdminAddShow from '../../components/AdminPanelComponents/AdminAddShow';
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
    // const [submitCheck, setSubmitCheck] = React.useState(false);
    const [finalSubmit, setFinalSubmit] = React.useState(false);
    const [checkScreamales, setCheckScreamales] = React.useState('');
    const [checkDeleteShow, setCheckDeleteShow] = React.useState('');
    const [finalDelete, setFinalDelete] = React.useState(false);
    const [updateShowInstructions, setUpdateShowInstructions] = React.useState('This will update the core show database');
    const [addShowInstructions, setAddShowInstructions] = React.useState('Add a gig!');
    const [addShowNum, setAddShowNum] = React.useState('');
    const [addShowDate, setAddShowDate] = React.useState('');
    const [addShowVenue, setAddShowVenue] = React.useState('');
    const [addShowAddress, setAddShowAddress] = React.useState('');
    const [addShowCity, setAddShowCity] = React.useState('');
    const [addShowStateCountry, setAddShowStateCountry] = React.useState('');
    const [checkAddShowEmpties, setCheckAddShowEmpties] = React.useState(false);

    const handleShowSearch = () => {
        if (searchShowNum !== '') {
            axios.get('/admin/shows', {
                params: {
                    showNum: searchShowNum
                }
            })
                .then(res => {
                    console.log(res);
                    if (Object.keys(res.data).length === 0) {
                        // console.log('empty data');
                        setNewShowId('');
                        setShowInfo({});
                        setNewShowNum('');
                        setNewShowDate('');
                        setNewShowVenue('');
                        setNewShowAddress('');
                        setNewShowCity('');
                        setNewShowStateCountry('');
                        setShowDetails();
                    } else {
                        setNewShowId(res.data[1]._id);
                        setShowInfo(res.data[1]);
                        setNewShowNum(res.data[1].showNum);
                        setNewShowDate(res.data[1].date);
                        setNewShowVenue(res.data[1].venue);
                        setNewShowAddress(res.data[1].address);
                        setNewShowCity(res.data[1].city);
                        setNewShowStateCountry(res.data[1].stateCountry);
                        setShowDetails(res.data[0]);
                    }
                })
                .catch(err => console.log(err));
        }
    };

    const handleCloseModal = (type) => {
        setDisplayModal(false);
        document.body.style.overflowY = 'visible';

        if (type === 'showInfo') {
            setFinalSubmit(false);
            setCheckScreamales('');
            setFinalDelete(false);
            setCheckDeleteShow('');
            setUpdateShowInstructions('This will update the core show database');
        } else if (type === 'addShow') {
            setAddShowInstructions('Add a gig!');
            setAddShowNum('');
            setAddShowDate('');
            setAddShowVenue('');
            setAddShowAddress('');
            setAddShowCity('');
            setAddShowStateCountry('');
            setCheckAddShowEmpties(false);
        }
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

    const handleInitialDelete = () => {
        setFinalDelete(true);
        setUpdateShowInstructions('ARE YOU SURE YOU WANT TO DELETE THIS SHOW?!?!?');
    };

    const handleDeleteShow = () => {
        const deleteObj = {
            showNum: newShowNum
        };
        if (checkDeleteShow!=='delete this show') {
            setUpdateShowInstructions('That does not match');
        } else {
            console.log(deleteObj);
            axios.delete('/admin/delete-show', {
                params: {
                    _id: newShowId
                }
            })
            .then(res=> {
                console.log(res);
                setUpdateShowInstructions('DELETED!');
                    setTimeout(() => {
                        handleCloseModal('showInfo');
                        handleShowSearch();
                    },1000);
            })
            .catch(err=>{
                console.log(err);
            });
        }
    };

    const handleUpdateShow = () => {
        if (checkScreamales !== 'screamales') {
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
            axios.put('/admin/shows', updateShowObj)
                .then(res => {
                    console.log(res);
                    setUpdateShowInstructions('UPDATED!');
                    setTimeout(() => {
                        handleCloseModal('showInfo');
                        handleShowSearch();
                    },1000);
                })
                .catch(err => {
                    console.log(err);
                    setUpdateShowInstructions('Something went wrong');
                });
        }
    };

    const handleAddShow = () => {
        const addShowObj = {
            showNum: addShowNum,
            date: addShowDate,
            venue: addShowVenue,
            address: addShowAddress,
            city: addShowCity,
            stateCountry: addShowStateCountry
        };

        const addShowAxios = () => {
            axios.post('/admin/shows', addShowObj)
                .then(res => {
                    console.log(res);
                    setAddShowInstructions('SHOW ADDED!');
                    setTimeout(() => {
                        handleCloseModal('addShow');
                    },1000);
                })
                .catch(err => {
                    console.log(err);
                    if (err.response.data === 'showNumExists') {
                        setAddShowInstructions('WOAH! HOLD UP! THAT SHOW NUMBER ALREADY EXISTS!');
                    } else {
                        setAddShowInstructions('Something went wrong');
                    }
                })
        };

        if ((addShowNum === '' || addShowDate === '' || addShowVenue === '' || addShowAddress === '' || addShowCity === '' || addShowStateCountry === '') && !checkAddShowEmpties) {
            setAddShowInstructions('Something is blank! Is that okay?');
            setCheckAddShowEmpties(true);
            return;
        }

        if (checkAddShowEmpties === true) {
            addShowAxios();
            return;
        }

        addShowAxios();

    };

    return (
        <div className='admin-sub-root'>
            <h1>Admin</h1>
            <br />
            <AdminAddShow
                handleOpenModal={handleOpenModal}
            />
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
                addShowInstructions={addShowInstructions}
                addShowNum={addShowNum}
                setAddShowNum={setAddShowNum}
                addShowDate={addShowDate}
                setAddShowDate={setAddShowDate}
                addShowVenue={addShowVenue}
                setAddShowVenue={setAddShowVenue}
                addShowAddress={addShowAddress}
                setAddShowAddress={setAddShowAddress}
                addShowCity={addShowCity}
                setAddShowCity={setAddShowCity}
                addShowStateCountry={addShowStateCountry}
                setAddShowStateCountry={setAddShowStateCountry}
                handleAddShow={handleAddShow}
                handleInitialDelete={handleInitialDelete}
                handleDeleteShow={handleDeleteShow}
                checkDeleteShow={checkDeleteShow}
                setCheckDeleteShow={setCheckDeleteShow}
                finalDelete={finalDelete}
            />
            }
        </div>
    );
};

export default AdminPanel;