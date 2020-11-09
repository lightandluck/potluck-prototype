import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
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
          <Link to="/table" className="nav-link">Reorder Table</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}