import React, { Component } from 'react';
import '../css/header.css';
import image from '../../image.jpeg';
import Nav from './nav'

/**
 * Header
 * Rendered By: Body
 * State: none
 * Props: Title, navigation callback functions
 * Renders: Page logo, Page name, the Nav component
 */
class Header extends Component {
   render() {
      return(
         <div id="header">
            <h1>Recipe Tracker</h1>
            <img src={image} alt="food" />
            {this.props.title !== "Login" && this.props.title !== "SignUp" ?
            <Nav toProfile={this.props.toProfile}
            goToSearch={this.props.goToSearch} signout={this.props.signout}
            />:null}
        </div>
      );
   }
}

export default Header;