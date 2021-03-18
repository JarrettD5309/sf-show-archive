import React from 'react';
import Backdrop from '../SlideDrawer/Backdrop';
import NavBar from '../NavBar';
import SlideDrawer from '../SlideDrawer/SlideDrawer';

const NavBarComponent = (props) => {
    const {
        loggedIn,
        setLoggedIn,
        isAdmin,
        setIsAdmin
    } = props;
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleBackdrop = () => {
        setDrawerOpen(false);
    };

    return (
        <div>
            <NavBar
                handleDrawerToggle={handleDrawerToggle}
            />
            <SlideDrawer
                handleBackdrop={handleBackdrop}
                setDrawerOpen={setDrawerOpen}
                show={drawerOpen}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
            />
            <Backdrop
                handleBackdrop={handleBackdrop}
                show={drawerOpen}
            />
        </div>
    );
};

export default NavBarComponent;