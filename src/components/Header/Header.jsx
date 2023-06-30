import React, { useContext, useEffect, useState } from 'react';
import "./Header.css";
import { Link, useLocation } from 'react-router-dom';
import homeBg from "../../assets/homeBg.jpg";
// import supRoomBg from "/superior.jpg";
import logoWhite from "../../assets/logo-white.png";
import { HashLink } from 'react-router-hash-link';
import { AuthContext } from '../../context/ContextAuth';

const Header = () => {
    const [currentPageBg, setCurrentPageBg] = useState(null);
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        if (path === "/") {
            setCurrentPageBg(homeBg);
        }
        else if (path === "/room/superior") {
            setCurrentPageBg("/superior.jpg");
        }
        else if (path === "/room/signature") {
            setCurrentPageBg("/signature.jpg");
        }
        else if (path === "/room/delux") {
            setCurrentPageBg("/delux.jpg");
        }
        else if (path === "/room/luxury") {
            setCurrentPageBg("/luxury.jpg")
        }
    }, [location])


    // using context value
    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                //do nothing
            })
    }


    return (
        <div
            className={`mb-3 header ${path === "/login" || path === "/register" ? "d-none" : ""}`}
            style={
                { width: "100%", height: "100vh", backgroundImage: `url(${currentPageBg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover" }
            }
        >
            {/* navigation menu */}
            <nav className='navigation container'>
                <div className='logo-container'>
                    <img src={logoWhite} alt="logo" className='logo-white' />
                </div>

                <div className='nav-link-btn'>
                    <div>
                        <Link to="/" className='position-relative nav-links'>
                            <span className="hover-border">Home</span>
                        </Link>
                        <HashLink smooth to="/#rooms" className='position-relative nav-links'>
                            <span className="hover-border">Our Rooms</span>
                        </HashLink>
                        <Link to="/" className='position-relative nav-links'>
                            <span className="hover-border">Experience</span>
                        </Link>
                        <Link to="/" className='position-relative nav-links'>
                            <span className="hover-border">Contact</span>
                        </Link>

                    </div>
                    <div>
                        {user?.uid ?

                            <button className="btn btn-dark fw-bolder" onClick={handleLogOut}>Sign Out</button>
                            :
                            <>
                                <Link to="/login">
                                    <button className="btn btn-outline-dark text-white fw-bolder">Login</button>
                                </Link>

                                <Link to="/register">
                                    <button className="btn btn-dark fw-bolder">Register</button>
                                </Link>
                            </>}

                        {user?.uid && (
                            <img
                                src={`${user?.photoURL ? user.photoURL : "https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png"}`} alt=""
                                style={{ width: "50px", borderRadius: "50%" }}
                                title={`${user?.displayName || user?.email || "No user found"}`}
                            />
                        )}
                    </div>
                </div>
            </nav>


            {/* text content */}
            <div className='text-white header-text'>
                {path === "/" && (
                    <div>
                        <p>LIVE THE EXPERIENCE</p>
                        <h1>MAKE YOURSELF AT HOME</h1>
                        <HashLink smooth to="/#rooms">
                            <button className="rounded-0 text-white fw-bold">
                                VIEW OUR ROOMS
                            </button>
                        </HashLink>
                    </div>
                )}
                {path === "/room/superior" && (
                    <div>
                        <h1>Superior Room</h1>
                    </div>
                )}
                {path === "/room/signature" && (
                    <div>
                        <h1>Signature Room</h1>
                    </div>
                )}
                {path === "/room/delux" && (
                    <div>
                        <h1>Delux Room</h1>
                    </div>
                )}
                {path === "/room/luxury" && (
                    <div>
                        <h1>Luxury Suite Room</h1>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Header;