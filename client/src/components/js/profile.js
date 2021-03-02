import React, { Component } from 'react';
import '../css/profile.css';
import MyRecipes from './myrecipes';
import MyFavorites from './myfavorites';

/**
 * Profile
 * Rendered By: Body
 * State: none
 * Props: user (name), addNew, myRecipes, goToRecipes, myFavorites
 * Renders: MyRecipes and MyFavorites
 */
class Profile extends Component {
   render() {
      return (
         <div id="profile">
            <h1>Welcome, {this.props.user}</h1>
            <div className="flex">
               <MyRecipes addNew={this.props.addNew} myRecipes={this.props.myRecipes} goToRecipes={this.props.goToRecipes}/>
               <MyFavorites myFavorites={this.props.myFavorites} goToRecipes={this.props.goToRecipes}/>
            </div>
         </div>
      );
   }
}

export default Profile;
