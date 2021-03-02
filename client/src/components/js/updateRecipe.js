import React, { Component } from 'react';
import RecipeParts from './recipeParts';
import "../css/update.css";

/**
 * Update Recipe
 * Rendered By: Body
 * State: ingredient, ingredients, instruction, instructions,
 *        addeding, addedins
 * Props: allRecipes, id, title, reloadRecipes, goToRecipe
 * Renders: RecipeParts, UpdateForm, Updates
 */
class UpdateRecipe extends Component {
   constructor() {
      super();
      this.state = {
         ingredient: "",
         ingredients: "",
         instruction: "",
         instructions: "",
         addeding: [], 
         addedins: []
      };
   }
      
   /**
    * On component load, set the current recipe
    * ingredients and instructions
    */
   componentDidMount() {
      const allrecipes = this.props.allRecipes;
      const id=this.props.id;
      let recipe;
      let i; 
      for(i = 0; i < allrecipes.length; i++){
         if(allrecipes[i].id === id){
            recipe = allrecipes[i];
         }
      }
      this.setState({
         ingredients: recipe.ingredients,
         instructions: recipe.instructions
      });
   }

   /**
    * Remove an ingredient/instruction from list
    */
   remove = (obj, t) => {
      if(t === "ins"){
         this.setState({
            instructions: obj
         });
      }else if(t === "ing"){
         this.setState({
            ingredients: obj
         });
      }
   }

   /**
    * Update
    * Keeps track of changes to text boxes for adding
    */
   update = (event) => {
      this.setState({
         [event.target.name] : event.target.value
      });
   }

   /**
    * Adds what is inside text box for ingredients
    * to the list of added ingredients
    */
   addIngredient = () => {
      let added = this.state.addeding;
      added.push(this.state.ingredient);
      this.setState({
         ingredients: this.state.ingredients.concat('~',this.state.ingredient),
         addeding: added,
         ingredient: ""
      });
   }

   /**
    * Adds what is inside text box for instructions
    * to the list of added instructions
    */
   addInstruction = () => {
      let added = this.state.addedins;
      added.push(this.state.instruction);
      this.setState({
         instructions: this.state.instructions.concat('~', this.state.instruction),
         instruction: "",
         addedins: added
      });
   }

   /**
    * Update Recipe
    * Finalizes updates (called from Update button click)
    * Once complete, triggers render of Recipe component in Body
    */
   updateRecipe = () => {
      const recipe = {
         id: this.props.id,
         ingredients: this.state.ingredients,
         instructions: this.state.instructions
      }
      fetch('/updateRecipe', {
         method: 'POST',
         headers: {'Content-Type': 'application/json; charset=utf-8'},
         body: JSON.stringify(recipe),
      })
      .then(res => res.json())
      .then(json => {
         console.log("Recipe Updated");
         this.props.reloadRecipes(json);        //reset recipes with updates
         this.props.goToRecipe(this.props.id);  //load recipe component
       })
       .catch(err => {
         console.log("Error in fetch... ", err)
      });
   }

   render() {
      const allrecipes = this.props.allRecipes;
      const id=this.props.id;
      let recipe;
      let instructions;
      let ingredients;
      let i; 
      for(i = 0; i < allrecipes.length; i++){
         if(allrecipes[i].id === id){
            recipe = allrecipes[i];
         }
      }
      (this.state.instructions) ? instructions = this.state.instructions : 
         instructions = recipe.instructions;
      (this.state.ingredients) ? ingredients = this.state.ingredients : 
         ingredients = recipe.ingredients;
      return (
         <div id="updaterecipe">
            <h1>Update Recipe {recipe.name}</h1>
            <RecipeParts ins={instructions} ing={ingredients} 
               title={this.props.title} remove={this.remove}/> 
            <UpdateForm update={this.update} ingredient={this.state.ingredient} 
               instruction={this.state.instruction}
               addIngredient={this.addIngredient}  
               addInstruction={this.addInstruction}
               updateRecipe={this.updateRecipe}/>
            <Updates addeding={this.state.addeding} 
               addedins={this.state.addedins}/>
         </div>
      );
   }
}

/**
 * Update Form
 * Rendered By: UpdateRecipe
 * State: none
 * Props: update, ingredient, instruction, addIngredient, addInstruction,
 *        updateRecipe
 * Renders: The form for the update
 */
class UpdateForm extends Component {

   render(){
      return (
         <div id="updateform">
            <label>
               Ingredients:
               <input type='text' id="ingredients" name="ingredient" 
                  value={this.props.ingredient} onChange={this.props.update}/>
               <button type="button" onClick={this.props.addIngredient}>
                  Add Ingredient
               </button>
            </label>
            <label>
               Instructions:
               <input type='text' id="instructions" name="instruction" 
                  value={this.props.instruction} onChange={this.props.update}/>
               <button type="button" onClick={this.props.addInstruction}>
                  Add Instruction
               </button>
            </label>
            <button type='button' className="submit btn"  
               onClick={this.props.updateRecipe}>Submit Update</button>
         </div>
      );
   }
}

/**
 * Updates
 * Rendered By: UpdateRecipe
 * State: none
 * Props: addeding, addedins
 * Renders: Unsubmitted changes to recipe
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
  
export default UpdateRecipe;