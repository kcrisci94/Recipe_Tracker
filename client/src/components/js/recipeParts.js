import React, {Component} from 'react';
import '../css/recipeParts.css';

/**
 * Recipe Parts
 * Rendered By: Recipe
 * State: ingredients, instructions
 * Props: ing, ins
 * Renders: Ingredients and Instructions for recipe
 */
class RecipeParts extends Component {
   constructor() {
      super();
      this.state = {
         ingredients: [], //Array to hold ingredients
         instructions: [] //Array to hold instructions
      };
   }

    /**
     * On Component Load, store ing and ins from props 
     * into array format so easier to manipulate
     */
   componentDidMount() {
      const ing = this.props.ing;
      const ins = this.props.ins;
      this.setState({
         ingredients: ing.split("~"),
         instructions: ins.split("~")
      });
   }

    /**
     * Remove
     * Removes an ingredient or instruction from list
     * For use when updating recipe
     */
   remove = (i, t) => {
      if(t === "ins"){
         let instructions = this.state.instructions;
         let removed = instructions.splice(i + 1, 1);
         instructions = instructions.join("~");
         document.getElementById("removeins").innerHTML = 
         "Removed Instruction: " + removed;
         this.props.remove(instructions, "ins");
      }else if(t === "ing"){
         let ingredients = this.state.ingredients;
         let removed = ingredients.splice(i + 1, 1);
         ingredients = ingredients.join("~");
         document.getElementById("removeing").innerHTML = 
         "Removed Ingredient: " + removed;
         this.props.remove(ingredients, "ing");
      }
   }
   render() {
      const instructions = this.state.instructions;
      const ingredients = this.state.ingredients;
      return(
         <div id="recipe_parts">
            <div id="ing">
               <h2>Ingredients</h2>
               <div>
                  <ol>
                     {this.props.title === "Update" ? 
                        ingredients.slice(1).map((ing, i) => 
                           <li key={i}>{ing}
                              <button type="button" 
                                 onClick={() => this.remove(i, "ing")}>
                                    Delete
                              </button>
                            </li>
                        ): ingredients.slice(1).map((ing, i) => 
                           <li key={i}>{ing}</li>)
                     }
                  </ol>
                  <p id="removeing" className="output"></p>
               </div>
            </div>
            <div id="ins">
               <h2>Instructions</h2>
               <div>
                  <ol>
                     {this.props.title === "Update" ? 
                        instructions.slice(1).map((ins, i) => 
                        <li key={i}>{ins}
                           <button type="button" 
                              onClick={() => this.remove(i, "ins")}>
                              Delete
                           </button>
                        </li>) : instructions.slice(1).map((ins, i) => 
                        <li key={i}>{ins}</li>)
                     }
                  </ol>
                  <p id="removeins" className="output"></p>
               </div>
            </div>
         </div>

      );
   }
}
  
export default RecipeParts;