const express = require('express');
const mysql = require('mysql');
const md5 = require('md5');
const bodyParser = require('body-parser');
const app = express();

/*Use middleware to process JSON for POST requests*/
app.use(bodyParser.json());

/*Apply COORS access control headers*/
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

/*Create connection to MySql database*/
const db = mysql.createConnection({
   host : 'localhost',
   user : 'root',
   password : '@WSX2wsx',
   database : 'project'

});

db.connect((err) => {
   if(err) throw err;
});


/*Create users and respond with the Created User result*/
app.post('/createUser', (req, res) => {
   const fname = req.body.firstName;
   const lname = req.body.lastName;
   const uname = req.body.username;
   const sql = `INSERT INTO users(firstName, lastName, username, password) 
      VALUES('${fname}', '${lname}', '${uname}', '${md5(req.body.pword)}')`;
   db.query(sql, (err, result) => {
      if(err) {
         res.send("Please create a unique username")
      }else{
         console.log("User created");
         console.log(result);
         res.send(result);
      }
   });
});

/**
 * Check that username and passwords match
 * If they don't match, return 'null' to client
 * Otherwise, return user information
 */
app.post('/checkUser', (req, res) => {
   const uname = req.body.username;
   const sql = `SELECT firstName, lastName, username, id FROM users 
      WHERE username = '${uname}' AND password = '${md5(req.body.pword)}'`;
   db.query(sql, (err, result) => {
      if(err) throw err;
      if(result){
         console.log("Found User");
         console.log(result);
         res.send(result);
      }else{
         console.log("No user found");
         res.send(null);
      }
   });
});

/**
 * Create a recipe and store it in the Recipes table
 * Return all the recipes after new recipe is stored
 */
app.post('/createRecipe', (req, res) => {
   const uid = req.body.userId;
   const name = req.body.name;
   const ingredients = req.body.ingredients;
   const instr = req.body.instructions;
   let sql = `INSERT INTO recipes(userID, name, ingredients, instructions) 
      VALUES('${uid}', "${name}", "${ingredients}", "${instr}")`;
   db.query(sql, (err, result) => {
      if(err) throw err;
      console.log("Recipe created");
      console.log(result);
   });
   sql = `SELECT * FROM recipes;`
   db.query(sql, (err, result) => {
      if(err) throw err;
      console.log("fetched all recipes");
      res.send(result);
   });
});

/**
 * Get recipes pertaining to a specific user
 * Return these recipes to client
 */
app.post('/getMyRecipes', (req, res) => {
   const uid = req.body.id;
   const sql = `SELECT * FROM recipes WHERE userID = '${uid}'`;
   db.query(sql, (err, result) => {
      if(err) throw err;
      console.log("Recipes Retrieved");
      console.log(result);
      res.send(result);
   });
});

/**
 * Add a recipe to the favorites table for a particular user
 * Return all the favorites belonging to that user after insert is complete
 */
app.post('/addFavorite', (req, res) => {
   const uid = req.body.user_id;
   const recipeid = req.body.recipe_id;
   let sql = `INSERT INTO favorites(user_id, recipe_id) 
      VALUES('${uid}', '${recipeid}')`;
   db.query(sql, (err, result) => {
      if(err) throw err;
      console.log("Recipes Retrieved");
      console.log(result);
   });
   sql = `SELECT * FROM favorites LEFT JOIN recipes ON 
      favorites.recipe_id=recipes.id WHERE user_id = '${uid}'`;
   db.query(sql, (err, result) => {
      if(err) throw err;
      console.log("Favorites Retrieved");
      console.log(result);
      res.send(result);
   });
});

/**
 * Get all favorites belonging to a user
 * Return these favorites to the client
 */
app.post('/getMyFavorites', (req, res) => {
   const uid = req.body.id;
   const sql = `SELECT * FROM favorites LEFT JOIN recipes ON 
      favorites.recipe_id=recipes.id WHERE user_id = '${uid}'`;
   db.query(sql, (err, result) => {
      if(err) throw err;
      console.log("Favorites Retrieved");
      console.log(result);
      res.send(result);
   });
});

/**
 * Remove favorites from the Favorites table
 * Return new favorites list for user after complete
 */
app.post('/removeFavorite', (req, res) => {
   const uid = req.body.user_id;
   const recipe_id = req.body.recipe_id;
   let sql = `DELETE FROM favorites WHERE user_id = '${uid}' AND 
      recipe_id = '${recipe_id}'`;
   db.query(sql, (err, result) => {
      if(err) throw err;
      console.log("favorite deleted");
      console.log(result);
   });
  
   sql = `SELECT * FROM favorites LEFT JOIN recipes ON 
      favorites.recipe_id=recipes.id WHERE user_id = '${uid}'`;
   db.query(sql, (err, result) => {
      if(err) throw err;
      console.log("Favorites Retrieved");
      console.log(result);
      res.send(result);
   });

});

/**
 * Search for recipes with a specific set of characters in the name
 * Return matching recipes to the client
 */
app.post('/searchRecipes', (req, res) => {
   const name = req.body.name;
   const sql = `SELECT * FROM recipes WHERE name like '%${name}%'`;
   db.query(sql, (err, result) => {
      if(err) throw err;
      console.log("Recipes Retrieved");
      console.log(result);
      res.send(result);
   });
});

/**
 * Update a recipe
 * Return all recipes after update is complete
 */
app.post('/updateRecipe', (req, res) => {
   const id = req.body.id;
   const ins = req.body.instructions;
   const ing = req.body.ingredients;
   let sql = `UPDATE recipes SET ingredients = "${ing}", 
      instructions = "${ins}" WHERE id = '${id}'`;
   console.log(sql);
   db.query(sql, (err, result) => {
      if(err) throw err;
      console.log("Recipe updated");
      console.log(result);
   });
   sql = `SELECT * FROM recipes;`
   console.log(sql);
   db.query(sql, (err, result) => {
      if(err) throw err;
      res.send(result);
   });
});

/**
 * Search for all recipes
 * Return all recipes
 */
app.get('/searchAll', (req, res) => {
   const sql = `SELECT * FROM recipes`;
   db.query(sql, (err, result) => {
      if(err) throw err;
      console.log("Recipes Retrieved");
      console.log(result);
      res.send(result);
   });
});

//this is the port number specified in client .json file
const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
