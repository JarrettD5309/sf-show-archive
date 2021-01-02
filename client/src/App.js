import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Backdrop from './components/SlideDrawer/Backdrop';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import Search from './pages/Search';
import SlideDrawer from './components/SlideDrawer/SlideDrawer';
import TimelinePage from './pages/TimelinePage';


function App() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleBackdrop = ()=> {
        setDrawerOpen(false);
    };

    return (
        <Router>
            <NavBar handleDrawerToggle={handleDrawerToggle} />
            <SlideDrawer handleBackdrop={handleBackdrop} show={drawerOpen} />
            <Backdrop handleBackdrop={handleBackdrop} show={drawerOpen}/>
            {/* {drawerOpen && <Backdrop handleBackdrop={handleBackdrop} show={drawerOpen}/>} */}
            <Route exact path='/' component={TimelinePage} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/all-shows' component={HomePage} />
        </Router>
    );
}

export default App;
