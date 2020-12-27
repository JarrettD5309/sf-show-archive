import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Backdrop from './components/SlideDrawer/Backdrop';
import HomePage from './pages/HomePage';
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
            <SlideDrawer show={drawerOpen} />
            {drawerOpen && <Backdrop handleBackdrop={handleBackdrop} />}
            <Route exact path='/' component={()=> <TimelinePage handleDrawerToggle={handleDrawerToggle} />} />
            <Route exact path='/all-shows' component={HomePage} />
        </Router>
    );
}

export default App;
