import React, { Component } from 'react';
import '../css/myfavorites.css';

/**
 * MyFavorites
 * Rendered By: Profile
 * State: none
 * Props: myFavorites, goToRecipes
 * Renders: list of favorited recipes
 */
class MyFavorites extends Component {

   handler = (id) => {
      this.props.goToRecipes(id);
   }
   render() {
      let myFavorites = this.props.myFavorites;
      return (
         <div id="myFavorites">
            <h2>My Favorites</h2>
            <ul>
               {myFavorites.map((stat, i) => 
                  <li key={i}><button type="button" onClick={() => 
                     {this.handler(stat.id)}} key={i}>{stat.name}</button>
                  </li>
               )}
            </ul>
         </div>
      );
   }
}

export default MyFavorites;
