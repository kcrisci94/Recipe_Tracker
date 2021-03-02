CREATE DATABASE project;

USE project;

/* Create Tables */
CREATE TABLE users(id int AUTO_INCREMENT, firstName VARCHAR(25), lastName VARCHAR(30), username VARCHAR(25), password VARCHAR(50), PRIMARY KEY (id), CONSTRAINT uc_person UNIQUE(username));

CREATE TABLE recipes(id int AUTO_INCREMENT, name VARCHAR(30), ingredients VARCHAR(500), instructions VARCHAR(500), userID int, PRIMARY KEY (id));

CREATE TABLE comments(id int AUTO_INCREMENT, recipe_id int, comment VARCHAR(255), userCommented int, PRIMARY KEY (id));

CREATE TABLE favorites(id int AUTO_INCREMENT, user_id int, recipe_id int, PRIMARY KEY (id));


/* Create Users */
INSERT INTO users(firstName, lastName, username, password) VALUES('Draco', 'Malfoy', 'dmalfoy', '696d29e0940a4957748fe3fc9efd22a3');

INSERT INTO users(firstName, lastName, username, password) VALUES('Harry', 'Potter', 'hpotter', '696d29e0940a4957748fe3fc9efd22a3');

INSERT INTO users(firstName, lastName, username, password) VALUES('Ronald', 'Weasley', 'rweasley', '696d29e0940a4957748fe3fc9efd22a3');

INSERT INTO users(firstName, lastName, username, password) VALUES('Hermione', 'Granger', 'hgranger', '696d29e0940a4957748fe3fc9efd22a3');


/* Create Recipes */

/*Chili*/
INSERT INTO recipes(name,ingredients, instructions, userId) 
VALUES('Chili', '~1 lb ground hamburger~1 onion~1 stalk of celery~
2 tsp chili powder~1 tsp salt~dash of pepper~16oz can stewed tomatos~
8oz can tomato sauce~30oz can pinto beans', '~brown hamburger and drain 
fats~chop up onion and celery and add to meat~add salt, pepper, and chili powder~
add stewed tomatos and tomato sauce~let simmer covered for 1 hour, stirring 
occasionally~add beans and let simmer for 15 more min', 1);

/*Spaghetti*/
INSERT INTO recipes(name,ingredients, instructions, userId) 
VALUES('Spaghetti', '~spaghetti noodles~1 lb ground hamburger~1 onion~1 tsp salt~
2 celery~1 zucchini~1 box of sliced muchrooms~15oz can of stewed tomatos~15oz can 
tomato sauce~dash of dried basil', '~brown hamburger in pan and drain fat~chop up 
onion and add~chop up celery and add~chop up zucchini and mushrooms and add~add stewed 
tomatos and tomato sauce~add salt~slowly simmer covered for 3 hours~boil noodles until 
soft~drain noodles~spoon spaghetti sauce onto noodles', 1);

/*Salsa*/
INSERT INTO recipes(name,ingredients, instructions, userId) 
VALUES('Salsa', '~4 tomatos~3-6 tomatillos (depending on size)~1 small red onion~
3 jalapenos~1 bunch of fresh cilantro~2 small habanero peppers~8oz can tomato sauce~
1 clove of garlic~pinch of salt~dash of pepper', '~chop all vegetables into desired chunkiness
using a blender~add tomato sauce~add garlic~add salt and pepper~let refridgerate for 3 hours~
eat with chips', 1);

/*Soup*/
INSERT INTO recipes(name,ingredients, instructions, userId) 
VALUES('Soup', '~2-3 lbs beef short ribs~1 spoonful of better than beef (paste)~1 yellow onion~
2 long carrots~4 large potatos~2 celery~half a head of cabbage~1 cup macaroni~28oz diced tomatos~
8 cups water~salt and pepper', "~put water into a large pan and heat but don't boil~add better than 
beef paste to water~add beef short ribs to water~let sit for 3 hours~use a fork to remove fat from
meat (should be soft now)~add chopped onion, carrots, potatos, and celery~let simmer covered for 1 
hour~add diced tomatos, macaroni, and salt & pepper~let simmer for 30 more minutes~eat while it is hot!", 2);

/*Buttermilk Pancakes*/
INSERT INTO recipes(name,ingredients, instructions, userId) 
VALUES('Buttermilk Pancakes', '~2 cups buttermilk~2 tsp baking soda~1 egg beaten~1 cup flour~1 tsp sugar', 
"~mix flour, sugar, and baking soda into a medium bowl~mix buttermilk and egg in separate bowl~combine wet 
and dry items into one bowl~pour large spoonful of batter onto hot skillet~use a spatula to flip pancake after 
bottom is brown~enjoy with maple syrup", 2);

/*Peppersteak*/
INSERT INTO recipes(name,ingredients, instructions, userId) 
VALUES('Peppersteak', '~1 medium sized round steak~2 8oz cans of beef gravy~1 yellow onion~2 green bell peppers~
1 box sliced mushrooms~half spoonful of minced garlic~white rice', "~get a large glass oven pan~cut round steak 
into bite-sized chunks and add to pan~chop vegetables and add to pan~add beef gravy, garlic and salt & pepper~
mix so it is evenly distributed~bake in oven at 350 degrees for 1 hour~cook rice~spoon contents of pan onto rice", 3);

/*Chicken Pot Pie*/
INSERT INTO recipes(name,ingredients, instructions, userId) 
VALUES('Chicken Pot Pie', '~1 can of white chicken~1 can of veg-all~2-3 chopped potatos~half-spoon of minced 
garlic~1 tsp sage~1 8oz can of cream of chicken and mushroom soup~1 8oz can of cream of chicken w/ herb 
soup~1 egg~butter~salt & pepper~pie crust', "~mix can of chicken and veg-all in a bowl~chop potatos and saute 
in butter~add saute'd potatos to bowl~add garlic, sage and soups~place pie crust inside a pie pan~pour mixed 
items into pan~place top of pie crust over mixed contents~brust top with egg~add cuts for air to escape~bake 
at 400 degrees for first 10 minutes~bake at 350 degrees for next 40-45 minutes", 3);

/*Pan Roasted Chicken and Vegetables*/
INSERT INTO recipes(name,ingredients, instructions, userId) 
VALUES('Pan Roasted Chicken & Veggies', '~6 medium red potatos~1 large yellow onion~2 tbs olive oil~3 minced 
cloves of garlic~1 tsp dried rosemary~1/2 tsp paprika~6 bone-in chicken thighs (skin removed)~6 cups fresh 
baby spinach~salt & pepper', "~Chop potatos and place in large bowl~Chop onion and add~add oil, garlic, and 
salt & pepper~add rosemary~mix contents~mix paprika, more rosemary, salt and pepper into a small bowl~
sprinkle mixture over vegetables~roast until a thermometer in the chicken reads 170-175 degrees (35 to 40 min)
~remove chicken~top vegetables with spinach~roast vegetables for 10 more minutes~Stir vegetables and serve with 
chicken", 4);

/* Add Favorites */
INSERT INTO favorites(user_id, recipe_id) VALUES(1, 4);
INSERT INTO favorites(user_id, recipe_id) VALUES(1, 6);
INSERT INTO favorites(user_id, recipe_id) VALUES(2, 1);
INSERT INTO favorites(user_id, recipe_id) VALUES(2, 8);
INSERT INTO favorites(user_id, recipe_id) VALUES(3, 8);
INSERT INTO favorites(user_id, recipe_id) VALUES(3, 2);
INSERT INTO favorites(user_id, recipe_id) VALUES(4, 1);
INSERT INTO favorites(user_id, recipe_id) VALUES(4, 2);




