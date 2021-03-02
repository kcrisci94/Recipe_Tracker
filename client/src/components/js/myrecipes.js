import React, { Component } from 'react';
import '../css/myrecipes.css';

/**
 * MyRecipes
 * Rendered By: Profile
 * State: none
 * Props: goToRecipes, myRecipes, addNew
 * Renders: login form
 */
class MyRecipes extends Component {

   handler = (id) => {
      this.props.goToRecipes(id);
   }
   render() {
      let recipes = this.props.myRecipes;
      return (
         <div id="myRecipes">
            <h2>My Recipes</h2>
            <ul>
               {recipes.map((stat, i) =>
                  <li key={i}><button type="button" onClick={() => {
                     this.handler(stat.id)}} key={i}>{stat.name}</button>
                  </li>
               )}
            </ul>
            <button type="button" onClick={this.props.addNew} className="submit btn">Create New</button>
         </div>
      );
   }
}

export default MyRecipes;
