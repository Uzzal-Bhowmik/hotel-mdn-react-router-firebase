import './Rooms.css';
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Link } from 'react-router-dom';

const Rooms = () => {

    const [roomsData, setRoomsData] = useState([]);
    useEffect(() => {
        fetch("https://649d92079bac4a8e669df59b.mockapi.io/hotelsData/")
            .then(res => res.json())
            .then(data => setRoomsData(data))
    }, [])

    return (
        <div className='border' id='rooms'>
            {/* rooms heading */}
            <div className="rooms-heading row container mx-auto mt-4 mb-5">
                <div className="col-md-5">

                    <div className="row ms-3">

                        <div className="col-md-1 hyphen">
                            <span></span>
                        </div>

                        <div className="col-md-9">
                            <h1>OUR ROOMS AND SUITES</h1>
                        </div>

                    </div>

                </div>
                <div className="col-md-7">
                    {/* not used */}
                </div>
            </div>

            {/* rooms slider */}
            <div>
                <Swiper
                    slidesPerView={"auto"}
                    centeredSlides={true}
                    spaceBetween={30}
                    className="mySwiper"
                >
                    {
                        roomsData.map(room => (
                            <SwiperSlide key={room.id}>
                                <div>
                                    <img src={`/${room.id}.jpg`} alt="" />
                                </div>

                                <div className='row px-3 pt-4 pb-2'>
                                    <div className='col-md-8'>
                                        <h2 className='fw-bolder'>{room.title}</h2>
                                        <p>{room.m2} m2 / {room.adults} adults {room.children} children</p>
                                    </div>
                                    <div className='col-md-4 text-end'>
                                        <p className='m-0 p-0'>
                                            <small className="text-muted">from</small>
                                        </p>
                                        <h1 className='fw-bolder'>${room.price}</h1>
                                    </div>
                                </div>

                                <Link to={`/room/${room.id}`}>
                                    <button className="btn btn-outline-dark fw-bold mx-3 mb-3">BOOK NOW</button>
                                </Link>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>
        </div>
    );
};

export default Rooms;