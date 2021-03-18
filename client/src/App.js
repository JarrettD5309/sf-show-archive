import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import CreateAccount from './pages/CreateAccount';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import NavBarComponent from './components/NavBarComponent';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import Search from './pages/Search';
import Show from './pages/Show';
import TimelinePage from './pages/TimelinePage';
import User from './pages/User';
import withAuth from './withAuth';
import withAuthAdmin from './withAuthAdmin';
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
            <Router>
                <NavBarComponent 
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    isAdmin={isAdmin}
                    setIsAdmin={setIsAdmin}
                />
                
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

                    {/* Special page to add attendance to every show */}
                    {/* <Route path='/attendance' component={Attendance} /> */}


                    <Route path='*' component={() => <h1 style={{ textAlign: 'center' }} >404 NOT FOUND</h1>} />
                </Switch>
            </Router>
    );
}

export default App;
