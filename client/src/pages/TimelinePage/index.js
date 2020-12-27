import React from "react";
import Timeline from "../Timeline";
import './style.css';

const TimelinePage = () => {
    const [currentYear, setCurrentYear] = React.useState();
    const [currentMonth, setCurrentMonth] = React.useState();

    return (
        <div className='root'>
            <Timeline />
        </div>
    );

};

export default TimelinePage;