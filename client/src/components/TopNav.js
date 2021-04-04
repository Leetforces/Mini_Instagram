import React from 'react'
import { Link } from 'react-router-dom';

const TopNav = () => {

    return (
        <>
            <nav >
                <div className="nav-wrapper white colorBlack" >
                    <Link to="/" className="brand-logo colorBlack">Instagram</Link>
                    <ul id="nav-mobile" className="right ">
                        <li><Link to="register" className="colorBlack">Register</Link></li>
                        <li><Link to="/login" className="colorBlack">Login</Link></li>
                        <li><Link to="/profile" className="colorBlack">Profile</Link></li>
                        <li><Link to="/createpost" className="colorBlack">Create Post</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
};

export default TopNav;
