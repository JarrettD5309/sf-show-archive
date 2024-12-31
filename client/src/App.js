import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import AdminPanel from './pages/AdminPanel';
import CreateAccount from './pages/CreateAccount';
import ForgotPassword from './pages/ForgotPassword';
import LatestUpdates from './pages/LatestUpdates';
import Login from './pages/Login';
import NavBarComponent from './components/NavBarComponent';
import Profile from './pages/Profile';
import ProtectedRoute from './protectedRoute';
import ProtectedRouteAdmin from './protectedRouteAdmin';
import ResetPassword from './pages/ResetPassword';
import Search from './pages/Search';
import Show from './pages/Show';
import TimelinePage from './pages/TimelinePage';
import User from './pages/User';
import axios from 'axios';

import Attendance from './pages/Attendance';

const App = () => {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const checkLoggedIn = () => {
            axios.get('/api/checklogin')
                .then(res => {
                    if (res.status === 200) {
                        setLoggedIn(true);
                        getUserInfo();
                        checkAdminLogin();
                    } else {
                        setLoading(false);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        };

        const checkAdminLogin = () => {
            axios.get('/api/checkadminlogin')
                .then(res => {
                    if (res.status === 200) {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                })
                .catch(err => console.log(err));
        };

        checkLoggedIn();

    }, []);

    const checkAdminLogin = () => {
        axios.get('/api/checkadminlogin')
            .then(res => {
                if (res.status === 200) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            })
            .catch(err => console.log(err));
    };


    const getUserInfo = () => {
        axios.get('/api/getuser')
            .then(res => {
                setUserInfo(res.data);
            })
            .catch(err => console.log(err))
            .then(() => setLoading(false));
    };

    return (
        loading ?
            null :
            <Router
                future={{
                    v7_relativeSplatPath: true,
                    v7_startTransition: true
                }}
            >
                <NavBarComponent
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    isAdmin={isAdmin}
                    setIsAdmin={setIsAdmin}
                />

                <Routes>
                    <Route path='/' element={<TimelinePage />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/latest-updates' element={<LatestUpdates />} />
                    <Route path='/login' element={<Login setLoggedIn={setLoggedIn} getUserInfo={getUserInfo} checkAdminLogin={checkAdminLogin} />} />
                    <Route path='/create-account' element={<CreateAccount />} />
                    <Route path='/profile' element={
                        <ProtectedRoute loggedIn={loggedIn}>
                            <Profile userInfo={userInfo} getUserInfo={getUserInfo} />
                        </ProtectedRoute>
                    }
                    />
                    <Route path='/admin-panel' element={
                        <ProtectedRouteAdmin>
                            <AdminPanel />
                        </ProtectedRouteAdmin>
                    }
                    />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/reset-password/:token/:email' element={<ResetPassword />} />
                    <Route path='/show/:id' element={<Show loggedIn={loggedIn} userInfo={userInfo} />} />

                    <Route path='/user/:username' element={<User />} />

                    {/* Special page to add attendance to every show */}
                    {/* <Route path='/attendance' element={<Attendance />} /> */}


                    <Route path='*' element={<h1 style={{ textAlign: 'center' }} >404 NOT FOUND</h1>} />
                </Routes>
            </Router>
    );
}

export default App;
