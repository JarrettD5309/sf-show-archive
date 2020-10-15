import React from 'react';

function ShowInfo(props) {
    return (
        <div>
            <p>{props.showNum} - {props.date} - {props.venue} - {props.address} - {props.city} - {props.stateCountry}</p>
        </div>
    );
};

export default ShowInfo;