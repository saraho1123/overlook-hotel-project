# Overlook - Turing Mod 2 Final Solo Project

### [Canyon Overlook Hotel Pages](https://saraho1123.github.io/whats-cookin/src/index.html)

### [Link To My Repo](https://github.com/saraho1123/overlook-sosgood)

### [Link To Project Description](https://frontend.turing.io/projects/overlook.html)

---
---

  <img width="1439" alt="Screen Shot 2020-11-10 at 10 25 45 PM" src="https://user-images.githubusercontent.com/62810592/98765683-4d189f00-23a4-11eb-9740-5943dad21a1a.png">

## Table of Contents

* [Project Overview](#project-overview)
* [Goals](#goals)
* [Technologies And Tools](#technologies-and-tools)
* [Challenges](#challenges)
* [Wins](#wins)
* [ScreenShots and Demos](#screenshots-and-demos)
* [Roadmap](#roadmap)
* [Credits](#credits)

## Project Overview

For this project we created a recipe tracking/meal planning application. 

Our app's functionality included a user being able to: 

* choose and view their favorite recipes
* choose and view recipes to cook
* filter recipes by type, ingredients, 'favorites' or 'recipes to cook'
* plan what items the user would need to purchase in order to cook their chosen recipe (based on what ingredients the recipe calls for and what the user 'has' in their pantry)

## Goals

Our personal goals were to get better at sad path TDD, get a lot more comfortable with the array prototypes, and integrate what we’ve learned about JS so far. This was one of our first projects using TDD and ES6 JavaScript. 

We also wanted to work together in such a way that we would be willing to work together again!

## Technologies And Tools

* JavaScript (ES6)
* HTML
* CSS
* Adobe XD
* Google Jam Board

## Challenges

Our first big challenge was deciding how many Classes to include. We started with three, increased to six and ended up with five. After getting into our project, we realized that having a way to 'clean up' and organize our data would have been helpful. Although we didn't get to it for this project, it was a big learning opportunity for the future! Another thing we wish we had more time for was more TDD. Although we included it, we did not test for edge cases or for 'breaking' our code.

## Wins

We overcame some personal things while tackling this project. Although it definitely slowed us down, we are proud of the work we were able to accomplish in such a short time, including being able to complete nearly all the required funcionality for this project.

We did make our app responsive, which was a fun win!

## ScreenShots and Demos

---

### Home view of recipes

---

![scrolling through all recipes](https://media.giphy.com/media/cMgU4VT0iXQytTRrFf/giphy.gif)

<details>
  <summary>**Under the Hood**</summary>

All recipes are genereted on load event. To display all recipes from the recipes.js data file we used `forEach` method to loop through the each recipe and create an html element:

```javaScript

    <section class = "recipe-card">
          <div class="icon-box">
            <label>
              <input type="checkbox" name="recipe-buttons" id="chef-${recipe.id}" class="chef-radio-button">
              <img id="chef-icon-disabled" class="chef-icon" src="../images/chef.png" alt="chef icon unchosen">
              <img id="chef-icon-enabled" class="chef-icon hidden" src="../images/chef-solid.png" alt="chef icon chosen">
            </label>
            <label>
              <input type="checkbox" name="recipe-buttons" id="heart-${recipe.id}" class="heart-radio-button">
              <img id="heart-icon-enabled" class="heart-icon hidden" src="../images/favorite.svg" alt="heart icon chosen">
              <img id="heart-icon-disabled" class="heart-icon" src="../images/favorite_border.svg" alt="heart icon unchosen">              </label>
          </div>
          <img class="recipe-card-img" src="${recipe.image}" alt="recipe image">
          <h2 id=${recipe.id}>${recipe.name}</h2>
        </section>
```

</details>

---

### Single recipe view

---

![screenshot-single-recipe-view-1](https://media.giphy.com/media/CczV0CEcxPfdvJoqyQ/giphy.gif)

<details>
  <summary>**Under the Hood**</summary>

A single recipe view dipslays the individual recipe with the following information:

* Image
* Total cost of all ingredients
* Ingredients names and the amount
* Directions

All information is easlily pulled by accessing the Recipe instance. Each recipe has the following structure:

```javaScript

class Recipe {
  constructor(id, image, ingredients, instructions, name, tags) {
    this.id = id,
    this.image = image,
    this.ingredients = ingredients,
    this.instructions = instructions,
    this.name = name,
    this.tags = tags
  };

```

When you choose a recipe, the total cost of cooking that recipe can be easily calculated using methods inside the recipe class `calculateTotalCost(basket)` where 'basket' is the array of all the ingredients.

</details>

---

### Pantry view of the user's available ingredients for cooking:

---

![screenshot-pantry-view](https://user-images.githubusercontent.com/62810592/96782337-dabf2b00-13b2-11eb-96ba-6b40197e03ef.png)


<details>
  <summary>**Under the Hood**</summary>

When user clicks on a pantry button, the website takes the user to the pantry where all user's ingredients are displayed showing the names and the available amount.

```javaScript

class Pantry {
  constructor(userId, userPantry) {
    this.id = userId;
    this.pantry = userPantry;
    this.neededIngredients = [];
  }

```

Pantry has several methods that allow the user to determine the amount of ingredients left after cooking the recipes, however, these methods are not currently available. In the future we are planning to add this feature to our website so the users can see how many ingredients they have left and how many they need to buy in order to cook the chosen recipes.

</details>

---

## Roadmap

* Add a feature to see how many ingredients are left after cooking a recipe
* Ability to have a wallet that shows the amount users have available to spend on purchasing ingredients
* Have an opportunity to create a personal account to store all 'favorite' and 'ready to cook' recipes

## Credits

<img src="https://avatars0.githubusercontent.com/u/66269306?s=400&u=b59f8ccc1002269319d952aa028ee270629b2ead&v=4" alt="Olga Morgan"
 width="150" height="auto" />\

**Olga Morgan**
[GitHub Profile](https://github.com/scripka)

<img src="https://avatars0.githubusercontent.com/u/62810592?s=400&u=a28506c68a6b2869116ba071955e03f2f86a9f54&v=4" alt="Sarah Osgood"
 width="150" height="auto" />\

**Sarah Osgood**
[GitHub Profile](https://github.com/saraho1123)


## Deploying to GitHub Pages

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.
