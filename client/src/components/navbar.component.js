import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// TODO: Rename all `xxxx.component.js` files to just `xxxx.js`. 
// Also, capitalize their names because they are components (convention to capitalize)
const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">Potluck</Link>
      <div className="navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">Offerings</Link>
          </li>

          <li className="navbar-item">
            <Link to="/create" className="nav-link">Create Offering</Link>
          </li>

          <li className="navbar-item">
            <Link to="/player" className="nav-link">Create Player</Link>
          </li>

          <li className="navbar-item">
            <Link to="/wishlist" className="nav-link">Wishlist</Link>
          </li>
          
          <li className="navbar-item">
            <Link to="/totalwantlist" className="nav-link">Total Wantlist</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar