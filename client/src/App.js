import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Backdrop from './components/SlideDrawer/Backdrop';
import CreateAccount from './pages/CreateAccount';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Search from './pages/Search';
import SlideDrawer from './components/SlideDrawer/SlideDrawer';
import TimelinePage from './pages/TimelinePage';
import axios from 'axios';


const App = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);

    useEffect(() => {
        checkLoggedIn();
    }, []);

    const checkLoggedIn = () => {
        axios.get('/api/checklogin')
            .then(res => {
                if (res.status === 200) {
                    setLoggedIn(true);
                    console.log('LOGGED IN');
                } else {
                    console.log('not logged in');
                }
            })
            .catch(err => {
                console.log(err);

            });
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleBackdrop = () => {
        setDrawerOpen(false);
    };

    return (
        <Router>
            <NavBar handleDrawerToggle={handleDrawerToggle} />
            <SlideDrawer handleBackdrop={handleBackdrop} setDrawerOpen={setDrawerOpen} show={drawerOpen} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <Backdrop handleBackdrop={handleBackdrop} show={drawerOpen} />
            {/* {drawerOpen && <Backdrop handleBackdrop={handleBackdrop} show={drawerOpen}/>} */}
            <Route exact path='/' component={TimelinePage} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/login' component={() => <Login setLoggedIn={setLoggedIn} />} />
            <Route exact path='/create-account' component={CreateAccount} />
            <Route exact path='/all-shows' component={HomePage} />
        </Router>
    );
}

export default App;
