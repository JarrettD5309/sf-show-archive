import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import Backdrop from './components/SlideDrawer/Backdrop';
import CreateAccount from './pages/CreateAccount';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import Search from './pages/Search';
import Show from './pages/Show';
import SlideDrawer from './components/SlideDrawer/SlideDrawer';
import TimelinePage from './pages/TimelinePage';
import User from './pages/User';
import withAuth from './withAuth';
import withAuthAdmin from './withAuthAdmin';
import axios from 'axios';

const App = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
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

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleBackdrop = () => {
        setDrawerOpen(false);
    };

    return (
        loading ?
            null :
            <Router>
                <NavBar handleDrawerToggle={handleDrawerToggle} />
                <SlideDrawer handleBackdrop={handleBackdrop} setDrawerOpen={setDrawerOpen} show={drawerOpen} loggedIn={loggedIn} setLoggedIn={setLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
                <Backdrop handleBackdrop={handleBackdrop} show={drawerOpen} />
                <Switch>
                    <Route exact path='/' component={TimelinePage} />
                    <Route exact path='/search' component={Search} />
                    <Route exact path='/login' component={() => <Login setLoggedIn={setLoggedIn} getUserInfo={getUserInfo} checkAdminLogin={checkAdminLogin} />} />
                    <Route exact path='/create-account' component={CreateAccount} />

                    <Route exact path='/profile' component={withAuth(() => <Profile userInfo={userInfo} getUserInfo={getUserInfo} />)} />
                    <Route exact path='/admin-panel' component={withAuthAdmin(() => <AdminPanel />)} />
                    <Route exact path='/forgot-password' component={ForgotPassword} />
                    <Route exact path='/reset-password/:token/:email' component={ResetPassword} />
                    <Route path='/show/:id' component={() => <Show loggedIn={loggedIn} userInfo={userInfo} />} />

                    <Route path='/user/:username' component={User} />
                    <Route path='*' component={() => <h1 style={{ textAlign: 'center' }} >404 NOT FOUND</h1>} />
                </Switch>
            </Router>
    );
}

export default App;
