import React, { Component } from 'react';
import SearchRecipesText from "./search_recipes_text";
import SearchResults from './search_results';
import "../css/search_recipes.css";

/**
 * Search
 * Rendered By: Body
 * State: pageNum, recipes, max
 * Props: toProfile, goToSearch, goToRecipe, allRecipes
 * Renders: searchRecipesText, searchResults
 */
class SearchPage extends Component {

   constructor() {
      super();
      this.state = {
         pageNum: 1,   //Controls pagination of results
         recipes: [],  //Holds search results
         max: 5        //Max search results per page
      };
   }

    /**
     * On component load, set search results to all recipes
     */
   componentDidMount() {
      this.setState({recipes: this.props.allRecipes});
   }

    /**
     * Set Recipes
     * Search for recipes matching a search query
     * Sets the starting page number to 1 (first 5)
     * Param: name is the query to search for
     */
   setRecipes = (name) => {
      fetch('/searchRecipes', {
         method: 'POST',
         headers: {'Content-Type': 'application/json; charset=utf-8'},
         body: JSON.stringify({name: name}),
      })
      .then(res => res.json())
      .then(json => this.setState({recipes: json}))
      .catch(err => {
         console.log("Error in fetch... ", err)
      });
      
      this.setState({
         pageNum: 1
      });
   }

    /**
     * handler
     * View recipe that is clicked
     * param: id is the id of the recipe to view
     */
   handler = (id) => {
      this.props.goToRecipe(id);
   }
    
    /**
     * Next Page
     * Views the next 5 (or less) recipes in search results
     */
   nextPage = () => {
      let page = this.state.pageNum;
      this.setState({pageNum: page + 1});
   }

    /**
     * Previous Page
     * Views the previous 5 results
     */
   prevPage = () => {
      let page = this.state.pageNum;
      this.setState({pageNum: page - 1});
   }
    
   render() {
      const recipes = this.state.recipes;
      let next = false;
      let prev = this.state.pageNum > 1 ? true:false;
      if(!(this.state.pageNum * this.state.max + 1 > recipes.length)){
         next = true;
      }
      return (
         <div id="search">
            <h1>Search for Recipes</h1>
            <SearchRecipesText recipes={recipes} setRecipes={this.setRecipes}/> 
            <SearchResults recipes={recipes} pagenum={this.state.pageNum}
               handler={this.handler} max={this.state.max}/>
            <div>
               {prev ? <button type="button" className = "btn" 
                  onClick={this.prevPage}>Prev</button>:null}
               {next ? <button type="button" className = "btn" 
                  onClick={this.nextPage}>Next</button>:null}
            </div>
         </div>
      );
   }
}
  
export default SearchPage;