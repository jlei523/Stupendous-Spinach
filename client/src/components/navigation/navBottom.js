import React, { Component } from 'react';
import { Link } from 'react-router';
import Camera from '../Camera';

require('../../styles/main.css');

class NavigationBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-bottom">
        <div className="container navbar-container">
          <Camera />
          <Link to="/"><span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span></Link>
          <Link to="/googleMap"><span className="glyphicon glyphicon-record" aria-hidden="true"></span></Link>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
