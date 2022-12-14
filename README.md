![alt text](/public/MyKitchenLogo.png)

# My Kitchen
![Code Size](https://img.shields.io/github/languages/code-size/Code-the-Dream-School/MyKitchenApp-front)
![Image of HTML badge](https://img.shields.io/badge/HTML-2.0%25-orange) 
![Image of CSS badge](https://img.shields.io/badge/CSS-3.8%25-purple)
![Image of JavaScript badge](https://img.shields.io/badge/JavaScript-94.2%25-yellow)    

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

## Table of Contents
* [Description](#description)
* [Getting Started](#getting-started)
* [.env (backend only)](#env-backend-only)
* [APIs](#apis)
* [Deployment](#deployment)

***

## Description

Do you know what meal your going to prepare today? Just tell us what you have, and we will tell you what to prepare and enjoy!  
We chose this app as a way to showcase our talents as well as put out a way for users to get recipes, track nutrition and keep track of favorite meals found through our app.

There are two repos.    
The back-end which includes the front-end as a submodule [link here](https://github.com/Code-the-Dream-School/MyKitchenApp-back) and this separate repo here is for the front-end.    
(Instructions for the submodule are located in the back-end repo README.md)    

### Build by [Elena](https://github.com/elenamagay), [Nuriye](https://github.com/nuriyealp), [Xeniya](https://github.com/XeniyaDob), [Dahlak](https://github.com/Dahlak76)

### Mentors [John McGarvey](https://github.com/jrmcgarvey), [Vaidehi S](https://github.com/CodergirlVS)   
### Elena --
Public and Private Footers, New Recipe search form, Search Result page.   
 \- Filter, Pagination, Intolerances checkbox,   
 \- Different screen sizes responsiveness,   
 \- API GET method,   
 \- README.md

### Nuriya --


### Xeniya --

Dashboard, Navbar, Single recipe, and Favorite page.      
\- Used API's GET/POST/DELETE methods, Like/Unlike a recipe function.    
\- Loader component and Google Visualization Pie Chart.    
\- Responsiveness of corresponding pages.   
### Dahlak -- 

\- Back-end: server, API, middlewares, routing and DB. (All folders/files)  

\- Front-end: Google Auth for third-party sign-in feature. (Google.js, README.md)  

  
## Getting Started  
#### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Clone repo locally    
Run 'npm install' to install dependencies   
Run 'npm run start' to compile webpack  

## .env (backend only)   
MONGO_URI=  (https://account.mongodb.com/)    
JWT_SECRET=  (https://jwt.io/)   
JWT_LIFETIME=24h    
API_KEY= [Apply from spoonacular.com](https://spoonacular.com/food-api)    
#### (Google Auth keys in .env)      
CLIENT_ID=  (https://cloud.google.com/)    
CLIENT_SECRET= *same link as client id      
CALLBACK_URL=http://localhost:3002/auth/google/callback     

## APIs

Check route

- GET `/`

Check if the user is logged in

- GET `/checkUser`

Register a user

- POST `/api/v1/auth/register`
- Body: required
  - name
  - password (minimum 8 characters)
  - email (syntactically valid email)

Log in a user

- POST `/api/v1/auth/login`
- Body: required
  - email
  - password

### All the `/recipes` endpoints requires Authentication

Get recipe by query

- GET `/api/v1/recipes`
  (this is the 'search recipe' endpoint in the spoonacular docs)

Get individual recipe by recipe id

- GET `/api/v1/recipes/:id`
  (this is the 'get recipe information' endpoint in the spoonacular docs)

Get saved recipe list

- GET `/api/v1/recipes/list`

Save recipe item to users profile

- POST `/api/v1/recipes/list`
- Body: required
  - recipeId
  - title
  - image
  - imageType

Delete recipe from saved list

- DELETE `/api/v1/recipes/:id`

Get a random recipe

- GET `/api/v1/recipes`

  - takes in a number 1-100 for how many recipes are returned and also takes in a string
    can be any of these options - diets, meal types, cuisines, or intolerances

Remove active user from DB

- DELETE `/api/v1/auth/remove`

Change the password to a new password

- PATCH `/api/v1/auth/changePassword`
- Body: required

  - password (the old one),
  - newPassword (the new one)

  Success: returns a message "password changed"

  Failure: returns 'please provide password and new password' or 'invalid credentials'

Get a randomly generated recipe

- GET `/api/v1/recipes/random`

  Always the same for a given day. Do not put in an option for query. 



## Deployment 
The application is available for view [here](https://my-kitchen.onrender.com)
