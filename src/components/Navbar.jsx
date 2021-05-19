import React from  "react";
import { Link } from 'react-router-dom';
import "./navbar.css"
import VTAA from "../images/VTAA.png"
import ellipse from "../images/Ellipse.png"

const Navbar = () => {
    return (
        <div className="navbar margin">
            <Link to="/"> <img src={VTAA} className="logo" /><img src={ellipse} className="ellipse" /> </Link>
            <Link to='/service' className="navbar-entry">Service</Link>
            <Link to='/' className="navbar-entry">Features</Link>
            <Link to='/' className="navbar-entry">Contact</Link>
            
        </div>
        
    )
}

export default Navbar;