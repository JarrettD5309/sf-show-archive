import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Backdrop from './components/SlideDrawer/Backdrop';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Show from './pages/Show';
import SlideDrawer from './components/SlideDrawer/SlideDrawer';
import TimelinePage from './pages/TimelinePage';
import User from './pages/User';
import withAuth from './withAuth';
import axios from 'axios';



const App = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const checkLoggedIn = () => {
            axios.get('/api/checklogin')
                .then(res => {
                    if (res.status === 200) {
                        setLoggedIn(true);
                        getUserInfo();
                        console.log('LOGGED IN');
                    } else {
                        console.log('not logged in');
                        setLoading(false);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        };

        checkLoggedIn();

    }, []);



    const getUserInfo = () => {
        axios.get('/api/getuser')
            .then(res => {
                console.log('get info');
                console.log(res.data);
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
                <SlideDrawer handleBackdrop={handleBackdrop} setDrawerOpen={setDrawerOpen} show={drawerOpen} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                <Backdrop handleBackdrop={handleBackdrop} show={drawerOpen} />
                <Switch>
                    <Route exact path='/' component={TimelinePage} />
                    <Route exact path='/search' component={Search} />
                    <Route exact path='/login' component={() => <Login setLoggedIn={setLoggedIn} getUserInfo={getUserInfo} />} />
                    <Route exact path='/create-account' component={CreateAccount} />

                    <Route exact path='/profile' component={withAuth(() => <Profile userInfo={userInfo} getUserInfo={getUserInfo} />)} />

                    <Route path='/show/:id' component={() => <Show loggedIn={loggedIn} userInfo={userInfo} />} />

                    <Route path='/user/:username' component={User} />
                    <Route path='*' component={() => <h1 style={{textAlign:'center'}} >404 NOT FOUND</h1>} /> 
                </Switch>
            </Router>
    );
}

export default App;
