import React from 'react';
import { Link } from 'react-router-dom';
const Header = () =>
    (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
     <div className="collapse navbar-collapse" id="navbarSupportedContent">
       <ul className="navbar-nav mr-auto">
        <li>
           <Link className="nav-link" to="/start-game">Start Game</Link>
        </li>
       </ul>
     </div>
   </nav>
    )

export default Header;