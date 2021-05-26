import React from  "react";
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import "./navbar.css"
import VTAA from "../images/VTAA.png"
import ellipse from "../images/Ellipse.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {


    function handleNavbarClick(e){
        let mainNav = document.getElementById('nav-list');
        ReactDOM.findDOMNode(mainNav).classList.toggle('active')
    }
    
    return (
        
        <div className="navbar">
            <span className="navbar-toggle" id="js-navbar-toggle" onClick={handleNavbarClick}>
            <FontAwesomeIcon icon={faBars} className="menu-icon" />
            </span>
            <a href="#" class="logo">Vision</a>
            <ul className="main-nav" id="nav-list">
            <li >
            <Link to='/service' className="navbar-entry"><b>Service</b></Link>
            </li>
            <li>
            <Link to='/' className="navbar-entry"><b>Features</b></Link>
            </li>
            <li>
            <Link to='/' className="navbar-entry"><b>Contact</b></Link>
            </li>
            </ul>
        </div>
    )
}

export default Navbar;