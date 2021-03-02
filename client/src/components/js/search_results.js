import React, { Component } from 'react';
import '../css/search_text.css';

/**
 * SearchResults
 * Rendered By: SearchRecipes
 * State: none
 * Props: recipes, pagenum, handler, max
 * Renders: results for given query
 */
class SearchResults extends Component{
   render() {
      const max = this.props.max;
      let allrecipes = this.props.recipes;
      let recipes = this.props.recipes;
      let page = this.props.pagenum;
      let startingIndex = (page - 1) * max;
      let endingIndex; 
      if(recipes){
         if(page * max > recipes.length){
            recipes = recipes.slice(startingIndex);
            endingIndex = recipes.length % max + startingIndex;
         }else{
            recipes = recipes.slice(startingIndex, startingIndex + max);
            endingIndex = startingIndex + max;
         }
      }
      return(
         <div>
            <div className="center">
               <p>Showing Results: {startingIndex + 1} - {endingIndex} of 
                  {allrecipes.length}</p>
            </div>
            <ol start={startingIndex + 1} className="ul">
               {recipes.map((stat, i) => 
                  <li key={i}><button type="button" onClick={() => {
                     this.props.handler(stat.id)}} key={i}>{stat.name}
                     </button>
                  </li>
                )}
            </ol>
         </div>
      );
   }
}

export default SearchResults;