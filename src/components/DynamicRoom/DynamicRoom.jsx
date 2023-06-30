import React from 'react';
import "./DynamicRoom.css";
import { useLoaderData } from 'react-router-dom';


const DynamicRoom = () => {
    const roomData = useLoaderData();

    return (
        <div className='text-center fw-bold my-5'>
            <h1>Your Booking of
                <span className="fw-bolder text-uppercase"> {roomData.title} </span>
                was
                <span className='text-success'> Successful </span>
            </h1>
        </div>
    );
};

export default DynamicRoom;