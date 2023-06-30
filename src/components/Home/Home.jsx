import React from 'react';
import './Home.css';
import Rooms from '../Rooms/Rooms';

const Home = () => {
    return (
        <div>
            {/* Available Rooms */}
            <Rooms></Rooms>
        </div>
    );
};

export default Home;