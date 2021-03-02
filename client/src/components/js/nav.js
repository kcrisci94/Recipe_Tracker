import React, { Component } from 'react';
import '../css/nav.css';

/**
 * Nav
 * Rendered By: Header
 * State: none
 * Props: toProfile, goToSearch, signout
 * Renders: the nagivation bar
 */
class Nav extends Component {
   render() {
      const pg1 = "Profile";
      const pg2 = "Search";
      const pg3 = "Sign Out";
      return (
         <div id="nav">
            <ul id="navigation">
               <li><button type="button" onClick={this.props.toProfile}>
                   {pg1}</button></li>
               <li><button type="button" onClick={this.props.goToSearch}>
                   {pg2}</button></li>
               <li><button type="button" onClick={this.props.signout}>
                   {pg3}</button></li>
            </ul>
         </div>
      );
   }
}
  
export default Nav;