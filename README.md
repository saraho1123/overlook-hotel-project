# Overlook - Turing Mod 2 Final Solo Project

### [Canyon Overlook Hotel Pages](https://saraho1123.github.io/whats-cookin/src/index.html)

### [Link To My Repo](https://github.com/saraho1123/overlook-sosgood)

### [Link To Project Description](https://frontend.turing.io/projects/overlook.html)

---

<img width="1426" alt="Screen Shot 2020-11-10 at 11 08 37 PM" src="https://user-images.githubusercontent.com/62810592/98771298-b9e26800-23a9-11eb-9b2f-33858a6f7b81.png">

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

For this project we were asked to create a hotel management tool for a manager and guests to log in and use the site to book rooms, delete bookings (manager only), and see totals spent/revenue. 

As a guest, my app's functionality includes me being able to: 

* View room bookings I have made (past or present/upcoming)
* View total amount I have spent on rooms
* Select a date for which I’d like to book a room for myself
* Upon selecting a date, I should be shown a list of room details for only rooms that are available on that date
* Be able to filter the list of available rooms by their roomType property
* Be able to select a room for booking
* In the event that no rooms are available for the date/roomType selected, I should see a message displayed, fiercely apologizing to the me and asking me to adjust their room search.

As a manager, my app's functionality includes me being able to: 
* View total Rooms Available for today’s date
* View total revenue for today’s date
* View percentage of rooms occupied for today’s date
* Search for a guest
* View their name, a list of all of their bookings, and the total amount they’ve spent
* Add a room booking for that user
* Delete any upcoming room bookings for that user (they cannot delete a booking from the past)

## Goals

* to successfully GET, POST and DELETE using fetch 
* to use webpack 
* to acheive 100% accessibility on lighthouse
* use class inheritance
* to have time to refactor

## Technologies And Tools

* JavaScript (ES6)
* HTML
* CSS
* excalidraw
* webpack
* SASS
* fetch API

## Challenges

* I struggled a bit with POSTing and DELETEing, mainly because I called those in my classes. I learned that it would have been better to call them in my index.js file.
* I also did not have time to refactor. A big piece of that would have been reducing the number of query selectors. But more importantly, I had planned to move all my dom manipulation into my dom-updates folder. I am disappointed I did not have time to do that. It is still an issue on my project board though!
* Testing with chai spies.

## Wins

* Coming into this project off of an incredibly difficult winning was a challenge. But I am counting as a win because I was able to meet the MVP for this project, something that I doubted several times that I would be able to do!
* I successfully used fetch APIs! 
* I successsfully used class inheritance! 

## ScreenShots and Demos

---

### Login View

<img width="1439" alt="Screen Shot 2020-11-10 at 10 25 45 PM" src="https://user-images.githubusercontent.com/62810592/98765683-4d189f00-23a4-11eb-9740-5943dad21a1a.png">

---

### Guest Home View

<img width="1425" alt="Screen Shot 2020-11-10 at 10 26 47 PM" src="https://user-images.githubusercontent.com/62810592/98765709-5dc91500-23a4-11eb-9c70-37051c292bce.png">

---

### Guest Choose Date View

<img width="1423" alt="Screen Shot 2020-11-10 at 10 27 32 PM" src="https://user-images.githubusercontent.com/62810592/98765772-79342000-23a4-11eb-9513-96e22facbc02.png">

---

### Guest Book Room View

<img width="1424" alt="Screen Shot 2020-11-10 at 10 28 29 PM" src="https://user-images.githubusercontent.com/62810592/98765955-8ea94a00-23a4-11eb-8806-b052d403347c.png">

---
### Manager Home and Interaction View

<img width="1428" alt="Screen Shot 2020-11-10 at 10 29 24 PM" src="https://user-images.githubusercontent.com/62810592/98766197-9ff25680-23a4-11eb-8099-7a3a5b43b49b.png">

---

## Roadmap

* Clean up a bit of the styling
* Make use of the dom-updates file
* Add pictures to rooms based on the room type (perhaps eventually adding a different picture for each room).
* Allow customers to filter available rooms by cost (min/max), bed size, and/or number of beds
* Allow customers and managers to add a room service charge to a booking
* Deploy to GitHub Pages

## Credits

<img src="https://avatars0.githubusercontent.com/u/62810592?s=400&u=a28506c68a6b2869116ba071955e03f2f86a9f54&v=4" alt="Sarah Osgood"
 width="150" height="auto" />\

**Sarah Osgood**
[GitHub Profile](https://github.com/saraho1123)

## With Lots of Help and Guidance from:
**Taras Tarlov**
[GitHub Profile](https://github.com/ttarlov)

* *Thanks for all your encouragement and advice. I can't say how much I appreciate it!*

**Nathaniel Millard**
[GitHub Profile](https://github.com/nathanielmillard)

* *Thank you for helping me navigate my way through a very tough inning!*

## Deploying to GitHub Pages

* I am leaving this here because I would like to clean up a few things before I deploy.

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.
