
import React from 'react';
import Login from './login';
import Profile from './profile';
import CreateRecipe from './create_recipe';
import Recipe from './recipe_page';
import SearchPage from './search_page';
import Signup from './signup';
import UpdateRecipe from './updateRecipe'
import Header from './header'
import '../css/body.css';

/**
 * Body
 * Rendered By: Page
 * State: All the recipes in the database
 * Props: addAllRecipes, addNewRecipe, allRecipes, currentRecipe, 
 *        editUser, goToRecipe, goToSearch, goToUpdate, myFavorites, 
 *        myRecipes, setMyFavorites, setMyRecipes, signout, title, toProfile, 
 *        toSignup, user, userid, 
 * Renders: Header, Login, Profile, Create Recipe, 
 *          Recipe, SearchPage, UpdateRecipe, Signup
 */
class Body extends React.Component {
   constructor() {
      super();
      this.state = {
         allRecipes: []
      };
   }
  /**
   * Gets all recipes stored in the database when Body is rendered             
   * Stores these recipes in the state
   */
   componentDidMount() {
      fetch('/searchAll')
      .then(res => res.json())
      .then(stats => this.setState({allRecipes : stats}))
      .catch(err => {
         console.log("Error in fetch... ", err)
      });
   }

  /**
   * Reloads all recipes and stores them in the state
   * Takes in an array of recipes
   * Called when a recipe is updated or added 
   */
   reloadRecipes = (recipes) => {
      this.setState({allRecipes: recipes});
      this.props.setMyRecipes(recipes);
   }

   render() {
      return (
         <div>
            <Header title={this.props.title} toProfile={this.props.toProfile}
            goToSearch={this.props.goToSearch} signout={this.props.signout} />

            {this.props.title === "Login" ? 
            <Login handleChange={this.props.editUser} 
            toSignup={this.props.toSignup}/> : null}

            {this.props.title === "Profile" ? <Profile user={this.props.user} 
            addNew={this.props.addNewRecipe} myRecipes={this.props.myRecipes}
            goToRecipes={this.props.goToRecipe} 
            myFavorites={this.props.myFavorites}/> : null}

            {this.props.title === "New Recipe" ? <CreateRecipe 
            id={this.props.id} reloadRecipes={this.reloadRecipes}/>: null}

            {this.props.title === "Recipe" ? <Recipe 
            id={this.props.currentRecipe} 
            userID={this.props.userid} allRecipes={this.state.allRecipes}
            setMyFavorites={this.props.setMyFavorites}
            myFavorites={this.props.myFavorites}
            goToUpdate={this.props.goToUpdate}/> : null}

            {this.props.title === "Search" ? <SearchPage 
            toProfile={this.props.toProfile} goToSearch={this.props.goToSearch}
            goToRecipe={this.props.goToRecipe}
            allRecipes={this.state.allRecipes}/>:null}

            {this.props.title === "Update" ? <UpdateRecipe 
            goToRecipe={this.props.goToRecipe}
            allRecipes={this.state.allRecipes} id={this.props.currentRecipe}
            reloadRecipes={this.reloadRecipes} title={this.props.title}/>:null}

            {this.props.title === "SignUp" ? <Signup 
            handler={this.props.editUser}/> : null}

         </div>
      );
   }
}

export default Body;

