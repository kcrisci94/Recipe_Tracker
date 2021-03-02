import React from 'react';
import Body from './body';
import '../css/page.css';

/**
 * Page
 * Rendered By: App
 * State: title, userInfo, myrecipes, myfavorites, currentRecipe, 
 *               allRecipes
 * Props: none
 * Renders: Body
 */
class Page extends React.Component {
   constructor() {
      super();
      this.state = {
         title: "Login",    //Controls which component is rendered by Body 
         userInfo: [],      //Holds information about user logged in
         myrecipes: [],     //Holds list of user's added recipes
         myfavorites: [],   //Holds list of user's favorited recipes
         currentRecipe: "", //Holds the ID of the recipe to view
         allRecipes: [],    //Holds list of all recipes
      };
   }
  
  /**
   * Triggers rendering of Profile component in Body
   */
   to_profile_page = (user) => { 
      this.setState({
         title: "Profile"
      });
   }
  
  /**
   * Update User
   * Stores the user information into state
   * Sets the title state to "Profile"
   * Gets and stores all user's recipes
   * Gets and stores all user's favorites
   * Param: stats holds user information
   */
   updateUser = (stats) => {
      this.setState({
         userInfo: stats,
         title: "Profile",
      });
      fetch('/getMyRecipes', {
         method: 'POST',
         headers: {'Content-Type': 'application/json; charset=utf-8'},
         body: JSON.stringify({id: this.state.userInfo.id})
      })
      .then(res => res.json())
      .then(stats => {this.setState({myrecipes: stats})})
      .catch(err => {
         console.log("Error in fetch... ", err)
      });

      fetch('/getMyFavorites', {
         method: 'POST',
         headers: {'Content-Type': 'application/json; charset=utf-8'},
         body: JSON.stringify({id: this.state.userInfo.id})
      })
      .then(res => res.json())
      .then(stats => {this.setState({myfavorites: stats})})
      .catch(err => {
         console.log("Error in fetch... ", err)
      });
   }
  /**
   * Set My Recipes
   * sets user's recipes
   * Param: a list of all recipes (after update/create)
   */
   setMyRecipes = (recipes) => {
      let myrecipes = [];
      let i;
      for(i = 0; i < recipes.length; i++){
         if(recipes[i].userID === this.state.userInfo.id) {
            myrecipes.push(recipes[i]);
         }
      }
      this.setState({myrecipes: myrecipes});
   }

  /**
   * Set My Favorites
   * Sets user's favorites 
   * Param: list of user's favorites
   */
   setMyFavorites = (favs) => {
      this.setState({
         myfavorites: favs
      });
   }

  /**
   * Add New Recipe
   * Switches the rendered component in Body to Create New Recipe 
   */
   addNewRecipe = () => {
      this.setState({
         title: "New Recipe"
      });
   }

  /**
   * Add All Recipes
   * Sets all recipes
   * Param: recipes holds the list of all recipes to store
   */
   addAllRecipes =  (recipes) => {
      this.setState({
         allRecipes: recipes
      });
   }

  /**
   * To Signup
   * Changes the rendered component in Body to Signup
   */
   toSignup = () => {
      this.setState({
         title: "SignUp"
      });
   }

  /**
   * Go To Recipe
   * Changes the rendered component in Body to Recipe
   * Sets the ID of the 'clicked' recipe to the currentRecipe state
   */
   goToRecipe = (id) => {
      this.setState({
         title: "Recipe",
         currentRecipe: id
      });
   }

  /**
   * Go To Search
   * Chnages the rendered component in Body to Search
   */
   goToSearch = () => {
      this.setState({
         title: "Search"
      });
   }

  /**
   * Go To Update
   * Changes the rendered component in Body to Update
   */
   goToUpdate = () => {
      this.setState({
         title: "Update"
      });
   }

  /**
   * Signout
   * Resets all information
   * Changes the rendered component in Body to Login
   */
   signout = () => {
      this.setState({
         userInfo: [],
         user: "",
         myrecipes: [],
         myfavorites: [],
         currentRecipe: "",
         allRecipes: [],
         title: "Login"
      })
   }

   render() {
      return (
         <div>
            <Body user={this.state.userInfo.firstName} title={this.state.title}
                  editUser={this.updateUser} addNewRecipe={this.addNewRecipe}
                  toSignup={this.toSignup} id={this.state.userInfo.id} 
                  toProfile={this.to_profile_page}
                  myRecipes={this.state.myrecipes} 
                  currentRecipe={this.state.currentRecipe}
                  goToRecipe={this.goToRecipe} goToSearch={this.goToSearch}
                  addAllRecipes={this.addAllRecipes}
                  allRecipes={this.state.allRecipes}
                  setMyRecipes={this.setMyRecipes} 
                  userid={this.state.userInfo.id}
                  setMyFavorites={this.setMyFavorites}
                  myFavorites={this.state.myfavorites}
                  goToUpdate={this.goToUpdate} signout={this.signout}/>
         </div>
      );
   }
}

export default Page;

