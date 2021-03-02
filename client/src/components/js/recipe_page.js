import React, { Component } from 'react';
import RecipeParts from './recipeParts';
import '../css/recipe_page.css';

/**
 * Recipe
 * Rendered By: Body
 * State: none
 * Props: id (for recipe), userID, allRecipes, setMyFavorites,
 *        myFavorites, goToUpdate
 * Renders: RecipeParts, Actions
 */
class Recipe extends Component {

   render() {
      const allrecipes = this.props.allRecipes;
      const id=this.props.id;       // the recipe id
      let recipe = null;
      let i; 
      for(i = 0; i < allrecipes.length; i++){
         if(allrecipes[i].id === id){
            recipe = allrecipes[i];   // the matching recipe
         }
      }
      return (
         <div id="recipe_page">
            <h1>{recipe.name}</h1>
            <RecipeParts ing={recipe.ingredients} ins={recipe.instructions}/>
            <Actions recipe={recipe} userID={this.props.userID} 
            setMyFavorites={this.props.setMyFavorites} 
            myFavorites={this.props.myFavorites} 
            goToUpdate={this.props.goToUpdate}/>
         </div>
      );
   }
}

/**
 * Actions
 * Rendered By: Recipe
 * State: none
 * Props: recipe, userId, setMyFavorites, myFavorites, goToUpdate
 * Renders: Button depending on who the recipe belongs to
 */
class Actions extends Component {

   /**
    * Add Favorite
    * Adds recipe to favorites table
    */
   addFavorite = () => {
      const data = {
         user_id: this.props.userID,
         recipe_id: this.props.recipe.id
      }
      fetch('/addFavorite', {
         method: 'POST',
         headers: {'Content-Type': 'application/json; charset=utf-8'},
         body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(json => {
         this.props.setMyFavorites(json);
      })
      .catch(err => {
         console.log("Error in fetch... ", err)
      });
      console.log("Added to Favorites");
   } 
   
  /**
   * Remove Favorite
   * Remove recipe from favorites table
   */
   removeFavorite = () => {
      const data = {
         user_id: this.props.userID,
         recipe_id: this.props.recipe.id
      }
      fetch('/removeFavorite', {
         method: 'POST',
         headers: {'Content-Type': 'application/json; charset=utf-8'},
         body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(json => {
         this.props.setMyFavorites(json);
      })
      .catch(err => {
         console.log("Error in fetch... ", err)
      });
      console.log("Removed From Favorites");
   } 

   render() {
      let button;
      let handler;
      let alreadyFavorite = 0;
      const myFavorites = this.props.myFavorites;
      const recipe = this.props.recipe;
      let i; 
      for(i = 0; i < myFavorites.length; i++){
         if(myFavorites[i].recipe_id === recipe.id) 
            alreadyFavorite = 1;
      }
      if(alreadyFavorite === 1){
         button="Unfavorite Recipe";
         handler=this.removeFavorite;
      }else if(this.props.userID === this.props.recipe.userID){
         button = 'Update Recipe';
         handler=this.props.goToUpdate;
      }else{
         button = 'Favorite Recipe';
         handler=this.addFavorite;
      }
      return(
         <div className="center">
            <button type="button" className="submit btn" onClick={handler}>
               {button}</button>
         </div>
      );
   }
}

export default Recipe;
