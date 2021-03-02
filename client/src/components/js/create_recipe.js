import React, { Component } from 'react';
import '../css/create_recipe.css';

/**
 * Create Recipe
 * Rendered By: Body
 * State: name of recipe, all ingredients/instructions for the recipe, 
 *        and arrays to hold added ingredients/instructions that have not 
 *        yet been stored in the recipes table
 * Props: the id of the person creating the recipe, and callback function to 
 *        update the 'all recipes' state in Body component
 * Renders: The form to create and submit a new recipe and the 
 *          Updates component
 */
class CreateRecipe extends Component {
   constructor() {
      super();
      this.state = {
         name: "",
         ingredients: "",
         instructions: "", 
         addedIng: [],
         addedIns: []
      };
   }

  /**
   * Generalized function to update an item in state to the 
   * value in a text box (event)
   * (used for updating 'name' state)
   */
   update = (event) => {
      this.setState({
         [event.target.name] : event.target.value
      });
   }
  
  /**
   * Add an ingredient to the 'Added' array in state
   * Does not create the recipe until 'Create' is clicked
   */
   addIngredient = () => {
      let addeding = this.state.addedIng;
      let ingredient = document.getElementById("ingredients").value;
      document.getElementById("ingredients").value = "";
      addeding.push(ingredient);
      this.setState({
         addedIng: addeding,
         ingredients: this.state.ingredients.concat('~',ingredient),
         ingredient: ""
      });
   }

  /**
   * Add an instruction to the 'Added' array in state
   * Does not submit the recipe until 'Create' is clicked
   */
   addInstruction = () => {
      let addedins = this.state.addedIns;
      let instruction = document.getElementById("instructions").value;
      document.getElementById("instructions").value = "";
      addedins.push(instruction);
      this.setState({
         addedIns: addedins,
         instructions: this.state.instructions.concat('~', instruction),
         instruction: ""
      });
   }

  /**
   * Submits the recipe to the database
   * Refreshes the 'All Recipes' list in the Body component
   */
   submitRecipe = () => {
      const recipe = {
         userId: this.props.id,
         name: this.state.name,
         ingredients: this.state.ingredients,
         instructions: this.state.instructions
      }
      fetch('/createRecipe', {
         method: 'POST',
         headers: {'Content-Type': 'application/json; charset=utf-8'},
         body: JSON.stringify(recipe),
      })
      .then(res => res.json())
      .then(json => {
         this.props.reloadRecipes(json);  // Refresh all recipes in Body
         document.getElementById("response").innerHTML = "Recipe Created";
         console.log("Created Recipe: ", recipe.name);
      })
      .catch(err => {
         console.log("Error in fetch... ", err)
      });
   }

   render() {
      return (
         <div id="create">
            <h1>Add a Recipe</h1>
            <form>
               <div className="center">
                  <label>
                     Recipe Name:
                     <input type='text' id="name" name="name" 
                     value={this.state.name} onChange={this.update}/>
                  </label>
               </div>
               <div className="flex-vert">
                  <label>
                     Ingredients:
                     <input type='text' id="ingredients" name="ingredient"/>
                     <button type="button" className="btn2" 
                     onClick={this.addIngredient}>Add Ingredient</button>
                  </label>
                  <label>
                     Instructions:
                     <input type='text' id="instructions" name="instruction" />
                     <button type="button" className="btn2" 
                     onClick={this.addInstruction}>Add Instruction</button>
                  </label>
               </div> 
               <div className="center2">
                  <button type='button' className="submit btn" 
                  onClick={this.submitRecipe}>Create</button>
                  <p className="response" id="response"></p>
               </div>
            </form>
            <Updates addeding={this.state.addedIng} 
            addedins={this.state.addedIns}/>
         </div>
      );
   }
}
/**
 * Updates
 * Rendered By: Create Recipe
 * State: none
 * Props: arrays - which items have been added to instructions and ingredients
 * Renders: Display of which ingredients and instructions have been added 
 *          before submission
 */
class Updates extends Component {
   render(){
      let ingupdates = this.props.addeding;
      let insupdates = this.props.addedins;
      return(
         <div id="updates">
            <div>
               <h2>Added Ingredients</h2>
               <ul>
                  {ingupdates.map((stat, i) =>
                     <li key={i}>{stat}</li>
                  )}
               </ul>
            </div>
            <div>
               <h2>Added Instructions</h2>
               <ul>
                  {insupdates.map((stat, i) =>
                     <li key={i}>{stat}</li>
                  )}
               </ul>
            </div>
         </div>
      );
   }
}
export default CreateRecipe;
