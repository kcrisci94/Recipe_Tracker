import React, { Component } from 'react';
import '../css/search_text.css';

/**
 * Search Recipes Text
 * Rendered By: SearchPage
 * State: search
 * Props: recipes, setRecipes
 * Renders: Search Bar
 */
class SearchRecipesText extends Component {
   constructor() {
      super();
      this.state = {
         search: ""    //Holds text in search bar
      };
   }

  /**
   * Update
   * Sets the text in search when user types in search bar
   */
   update = (event) => {
      this.setState({
         [event.target.name] : event.target.value
      });
   }
   render() {
      return (
         <div id="search_text">
            <label>
               Search All Recipes:
               <input type='text' id="search" name="search" 
                  onChange={this.update}/>
            </label>
            <button type="button" className = "btn" 
               onClick={() => this.props.setRecipes(this.state.search) }>Search</button>
         </div>
      );
   }
}

export default SearchRecipesText;
